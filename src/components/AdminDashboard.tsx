import { useEffect, useId, useRef, useState } from 'react'
import { CATEGORIES } from '../data/categories'
import englishData from '../data/english.json'
import spanishData from '../data/spanish.json'
import { useSearch } from '../hooks/useSearch'
import type { Language, Resource } from '../types'

interface EditableResource extends Resource {
  _id: string
}

interface AddressParts {
  street: string
  city: string
  state: string
  zip: string
}

function parseAddress(address: string): AddressParts {
  const trimmed = address.trim()
  if (!trimmed) {
    return { street: '', city: '', state: 'AR', zip: '' }
  }

  const fullMatch = trimmed.match(
    /^(.*),\s*([^,]+),\s*([A-Za-z]{2})(?:\s+(\d{5}(?:-\d{4})?))?$/,
  )
  if (fullMatch) {
    return {
      street: fullMatch[1].trim(),
      city: fullMatch[2].trim(),
      state: fullMatch[3].toUpperCase(),
      zip: (fullMatch[4] || '').trim(),
    }
  }

  const parts = trimmed.split(',').map((p) => p.trim())
  if (parts.length === 2) {
    return {
      street: parts[0],
      city: parts[1],
      state: 'AR',
      zip: '',
    }
  }

  return { street: trimmed, city: '', state: 'AR', zip: '' }
}

function combineAddress({ street, city, state, zip }: AddressParts): string {
  const s = street.trim()
  const c = city.trim()
  const st = state.trim().toUpperCase()
  const z = zip.trim()

  if (!s && !c && !z) {
    return ''
  }

  const stateZip = [st, z].filter(Boolean).join(' ')
  return [s, c, stateZip].filter(Boolean).join(', ')
}

function attachIds(items: Resource[]): EditableResource[] {
  return items.map((item, idx) => ({
    ...item,
    _id: `${idx}-${item.name || 'item'}-${Math.random().toString(36).slice(2, 7)}`,
  }))
}

function formatPhoneNumber(value: string): string {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }
  digits = digits.slice(0, 10)

  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function stripIds(items: EditableResource[]): Resource[] {
  return items.map(({ name, categories, phone, address, website, email }) => ({
    name: name.trim(),
    categories: categories.map((c) => c.trim()).filter(Boolean),
    phone: phone.trim(),
    address: address.trim(),
    website: website.trim(),
    email: email.trim(),
  }))
}

export function AdminDashboard() {
  const [language, setLanguage] = useState<Language>('en')
  const [resources, setResources] = useState<EditableResource[]>(() =>
    attachIds(englishData),
  )
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isNewEntry, setIsNewEntry] = useState(false)
  const [draft, setDraft] = useState<Resource>({
    name: '',
    categories: [],
    phone: '',
    address: '',
    website: '',
    email: '',
  })
  const [addressParts, setAddressParts] = useState<AddressParts>({
    street: '',
    city: '',
    state: 'AR',
    zip: '',
  })
  const [customCategoriesInput, setCustomCategoriesInput] = useState('')
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogTitleId = useId()
  const searchInputId = useId()
  const formIdPrefix = useId()

  const targetFile =
    language === 'en' ? 'src/data/english.json' : 'src/data/spanish.json'
  const presetCategories: readonly string[] = CATEGORIES[language]

  useEffect(() => {
    document.title = 'Local Admin Dashboard | SVdP Rogers Resources'
  }, [])

  // Load fresh JSON from disk when switching language
  useEffect(() => {
    let active = true
    fetch(`/__admin/resources?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load JSON from disk')
        return res.json() as Promise<Resource[]>
      })
      .then((data) => {
        if (active) {
          setResources(attachIds(data))
          setEditingId(null)
          setIsNewEntry(false)
        }
      })
      .catch(() => {
        if (active) {
          setResources(
            attachIds(language === 'en' ? englishData : spanishData),
          )
        }
      })
    return () => {
      active = false
    }
  }, [language])

  // Fallback for browsers without native <dialog closedby="any"> support
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isDialogContent) {
        dialog.close()
      }
    }

    dialog.addEventListener('click', handleBackdropClick)
    return () => dialog.removeEventListener('click', handleBackdropClick)
  }, [])

  const filteredResources = useSearch(resources, query) as EditableResource[]

  const saveResourcesToDisk = async (
    nextList: EditableResource[],
    actionDescription: string,
  ) => {
    setIsSaving(true)
    setStatusMessage(null)
    try {
      const cleanPayload = stripIds(nextList)
      const response = await fetch('/__admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: language,
          resources: cleanPayload,
        }),
      })
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }
      setStatusMessage({
        type: 'success',
        text:
          language === 'en'
            ? `${actionDescription} — Saved ${cleanPayload.length} entries to ${targetFile}. Don't forget to switch to "Español (spanish.json)" and update the Spanish entry too!`
            : `${actionDescription} — Saved ${cleanPayload.length} entries to ${targetFile}.`,
      })
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Failed to save to ${targetFile}: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const startEditing = (item: EditableResource, isNew = false) => {
    const extraCategories = item.categories.filter(
      (cat) => !presetCategories.includes(cat),
    )
    setEditingId(item._id)
    setIsNewEntry(isNew)
    setDraft({
      name: item.name,
      categories: item.categories.filter((cat) =>
        presetCategories.includes(cat),
      ),
      phone: item.phone,
      address: item.address,
      website: item.website,
      email: item.email,
    })
    setAddressParts(parseAddress(item.address))
    setCustomCategoriesInput(extraCategories.join(', '))
    setCategoryError(null)
  }

  const handleAddNew = () => {
    const newItem: EditableResource = {
      _id: `new-${Date.now()}`,
      name: '',
      categories: [],
      phone: '',
      address: '',
      website: '',
      email: '',
    }
    setQuery('')
    setResources((prev) => [newItem, ...prev])
    startEditing(newItem, true)
  }

  const handleCancelEdit = () => {
    if (isNewEntry && editingId) {
      setResources((prev) => prev.filter((item) => item._id !== editingId))
    }
    setEditingId(null)
    setIsNewEntry(false)
    setCategoryError(null)
  }

  const handleToggleCategory = (category: string) => {
    setCategoryError(null)
    setDraft((prev) => {
      const exists = prev.categories.includes(category)
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      }
    })
  }

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    const extraCategories = customCategoriesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const mergedCategories = Array.from(
      new Set([...draft.categories, ...extraCategories]),
    )

    if (mergedCategories.length === 0) {
      setCategoryError(
        'Please select at least one category or type a custom category.',
      )
      const customCatInput = document.getElementById(
        `${formIdPrefix}-custom-cats`,
      )
      customCatInput?.focus()
      return
    }

    const updatedItem: EditableResource = {
      ...draft,
      _id: editingId,
      address: combineAddress(addressParts),
      categories: mergedCategories,
    }

    const nextList = resources.map((item) =>
      item._id === editingId ? updatedItem : item,
    )
    setResources(nextList)
    setEditingId(null)
    setIsNewEntry(false)

    await saveResourcesToDisk(
      nextList,
      `Updated "${updatedItem.name || 'Organization'}"`,
    )
  }

  const handleDeleteEntry = async (item: EditableResource) => {
    const nextList = resources.filter((r) => r._id !== item._id)
    setResources(nextList)
    if (editingId === item._id) {
      setEditingId(null)
      setIsNewEntry(false)
    }
    await saveResourcesToDisk(nextList, `Removed "${item.name}"`)
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-100 text-slate-900">
      <header className="border-b border-slate-800 bg-slate-900 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                SVdP Resource Update Dashboard
              </h1>
              <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-0.5 text-xs font-extrabold text-slate-950">
                LOCAL ADMIN ONLY
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Editing{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-amber-300">
                {targetFile}
              </code>{' '}
              ({resources.length} organizations)
            </p>
          </div>

          <div className="toolbar flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAddNew}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-emerald-400 disabled:opacity-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              + Add Organization
            </button>

            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-amber-400 bg-amber-400/15 px-4 py-2.5 text-sm font-bold text-amber-300 transition hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Commit Instructions
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        {/* Language dataset selector + search bar */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-300 bg-white p-4 shadow-sm md:grid-cols-3 md:items-end">
          <fieldset className="border-0 p-0 m-0">
            <legend className="mb-2 text-sm font-bold text-slate-900">
              Select JSON File to Edit
            </legend>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                  language === 'en'
                    ? 'border-sky-800 bg-sky-800 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                English (english.json)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                aria-pressed={language === 'es'}
                className={`rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                  language === 'es'
                    ? 'border-sky-800 bg-sky-800 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Español (spanish.json)
              </button>
            </div>
          </fieldset>

          <search className="md:col-span-2">
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor={searchInputId}
                className="mb-1.5 block text-sm font-bold text-slate-900"
              >
                Filter cards by name, category, or ZIP code
              </label>
              <input
                id={searchInputId}
                name="admin-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to filter cards..."
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                className="w-full rounded-lg border-2 border-slate-500 bg-white px-3.5 py-2.5 text-base text-slate-900 placeholder:text-slate-500 focus-visible:border-sky-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              />
            </form>
          </search>
        </div>

        {/* Status Toast / Banner */}
        <div role="status" aria-live="polite">
          {statusMessage && (
            <div
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-semibold shadow-sm sm:text-base ${
                statusMessage.type === 'success'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-red-600 bg-red-50 text-red-950'
              }`}
            >
              <span>{statusMessage.text}</span>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="ml-4 rounded-md px-2.5 py-1 text-xs font-bold underline hover:bg-black/5"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredResources.map((item) => {
            const isEditing = editingId === item._id

            if (isEditing) {
              return (
                <li key={item._id} className="md:col-span-2">
                  <article className="rounded-xl border-2 border-sky-700 bg-white p-5 shadow-md">
                    <form onSubmit={handleSaveEntry} className="flex flex-col gap-4">
                      <h2 className="text-lg font-bold text-slate-900">
                        {isNewEntry
                          ? 'Add New Organization'
                          : `Editing: ${item.name}`}
                      </h2>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1 sm:col-span-2">
                          <label
                            htmlFor={`${formIdPrefix}-name`}
                            className="text-sm font-bold text-slate-900"
                          >
                            Organization Name *
                          </label>
                          <input
                            id={`${formIdPrefix}-name`}
                            name="name"
                            type="text"
                            required
                            value={draft.name}
                            onChange={(e) =>
                              setDraft({ ...draft, name: e.target.value })
                            }
                            className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`${formIdPrefix}-phone`}
                            className="text-sm font-bold text-slate-900"
                          >
                            Phone Number *
                          </label>
                          <input
                            id={`${formIdPrefix}-phone`}
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            pattern="\(\d{3}\) \d{3}-\d{4}"
                            title="10-digit phone number in format (479) 555-0100"
                            value={draft.phone}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                phone: formatPhoneNumber(e.target.value),
                              })
                            }
                            placeholder="(479) 555-0100"
                            className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`${formIdPrefix}-website`}
                            className="text-sm font-bold text-slate-900"
                          >
                            Website URL
                          </label>
                          <input
                            id={`${formIdPrefix}-website`}
                            name="website"
                            type="url"
                            value={draft.website}
                            onChange={(e) =>
                              setDraft({ ...draft, website: e.target.value })
                            }
                            placeholder="https://example.org"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1 sm:col-span-2">
                          <label
                            htmlFor={`${formIdPrefix}-email`}
                            className="text-sm font-bold text-slate-900"
                          >
                            Email Address
                          </label>
                          <input
                            id={`${formIdPrefix}-email`}
                            name="email"
                            type="email"
                            value={draft.email}
                            onChange={(e) =>
                              setDraft({ ...draft, email: e.target.value })
                            }
                            placeholder="contact@example.org"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                          />
                        </div>
                      </div>

                      <fieldset className="rounded-lg border border-slate-300 p-3.5">
                        <legend className="px-1.5 text-sm font-bold text-slate-900">
                          Address (optional)
                        </legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                          <div className="flex flex-col gap-1 sm:col-span-6">
                            <label
                              htmlFor={`${formIdPrefix}-street`}
                              className="text-xs font-bold text-slate-800"
                            >
                              Street Address
                            </label>
                            <input
                              id={`${formIdPrefix}-street`}
                              name="street"
                              type="text"
                              autoComplete="street-address"
                              value={addressParts.street}
                              onChange={(e) =>
                                setAddressParts({
                                  ...addressParts,
                                  street: e.target.value,
                                })
                              }
                              placeholder="214 S 2nd St"
                              className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                            />
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-3">
                            <label
                              htmlFor={`${formIdPrefix}-city`}
                              className="text-xs font-bold text-slate-800"
                            >
                              City
                            </label>
                            <input
                              id={`${formIdPrefix}-city`}
                              name="city"
                              type="text"
                              autoComplete="address-level2"
                              value={addressParts.city}
                              onChange={(e) =>
                                setAddressParts({
                                  ...addressParts,
                                  city: e.target.value,
                                })
                              }
                              placeholder="Rogers"
                              className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                            />
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-1">
                            <label
                              htmlFor={`${formIdPrefix}-state`}
                              className="text-xs font-bold text-slate-800"
                            >
                              State
                            </label>
                            <input
                              id={`${formIdPrefix}-state`}
                              name="state"
                              type="text"
                              autoComplete="address-level1"
                              maxLength={2}
                              value={addressParts.state}
                              onChange={(e) =>
                                setAddressParts({
                                  ...addressParts,
                                  state: e.target.value
                                    .replace(/[^A-Za-z]/g, '')
                                    .toUpperCase(),
                                })
                              }
                              placeholder="AR"
                              className="rounded-lg border-2 border-slate-500 px-3 py-2 uppercase text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                            />
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <label
                              htmlFor={`${formIdPrefix}-zip`}
                              className="text-xs font-bold text-slate-800"
                            >
                              ZIP Code
                            </label>
                            <input
                              id={`${formIdPrefix}-zip`}
                              name="zip"
                              type="text"
                              inputMode="numeric"
                              autoComplete="postal-code"
                              maxLength={10}
                              value={addressParts.zip}
                              onChange={(e) =>
                                setAddressParts({
                                  ...addressParts,
                                  zip: e.target.value.replace(/[^\d-]/g, ''),
                                })
                              }
                              placeholder="72756"
                              className="rounded-lg border-2 border-slate-500 px-3 py-2 text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                            />
                          </div>
                        </div>
                      </fieldset>

                      <fieldset
                        aria-describedby={
                          categoryError ? `${formIdPrefix}-cat-error` : undefined
                        }
                        className={`rounded-lg border p-3.5 ${
                          categoryError
                            ? 'border-2 border-red-600 bg-red-50/40'
                            : 'border-slate-300'
                        }`}
                      >
                        <legend className="px-1.5 text-sm font-bold text-slate-900">
                          Categories (select or type at least one) *
                        </legend>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                          {presetCategories.map((cat) => {
                            const checkboxId = `${formIdPrefix}-cat-${cat}`
                            const checked = draft.categories.includes(cat)
                            return (
                              <div
                                key={cat}
                                className="flex items-center gap-2"
                              >
                                <input
                                  id={checkboxId}
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => handleToggleCategory(cat)}
                                  className="h-4 w-4 accent-sky-800"
                                />
                                <label
                                  htmlFor={checkboxId}
                                  className="cursor-pointer text-sm font-medium text-slate-900"
                                >
                                  {cat}
                                </label>
                              </div>
                            )
                          })}
                        </div>

                        <div className="mt-3 flex flex-col gap-1">
                          <label
                            htmlFor={`${formIdPrefix}-custom-cats`}
                            className="text-xs font-semibold text-slate-700"
                          >
                            Additional Custom Categories (comma-separated, optional)
                          </label>
                          <input
                            id={`${formIdPrefix}-custom-cats`}
                            name="customCategories"
                            type="text"
                            aria-invalid={categoryError ? 'true' : undefined}
                            aria-describedby={
                              categoryError
                                ? `${formIdPrefix}-cat-error`
                                : undefined
                            }
                            value={customCategoriesInput}
                            onChange={(e) => {
                              setCustomCategoriesInput(e.target.value)
                              if (e.target.value.trim()) {
                                setCategoryError(null)
                              }
                            }}
                            placeholder="e.g. Legal Aid, Childcare"
                            className="rounded-lg border border-slate-400 bg-white px-3 py-1.5 text-sm text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                          />
                        </div>

                        {categoryError && (
                          <p
                            id={`${formIdPrefix}-cat-error`}
                            role="alert"
                            className="mt-2 text-sm font-bold text-red-700"
                          >
                            {categoryError}
                          </p>
                        )}
                      </fieldset>

                      <div className="toolbar flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-3">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="rounded-lg border-2 border-slate-400 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="rounded-lg bg-sky-800 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-sky-900 disabled:opacity-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </form>
                  </article>
                </li>
              )
            }

            return (
              <li key={item._id} className="flex flex-col">
                <article className="flex h-full flex-col justify-between gap-4 rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                  <header className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {item.name}
                    </h2>
                    {item.categories.length > 0 && (
                      <ul
                        role="list"
                        className="flex flex-wrap gap-1.5"
                        aria-label="Categories"
                      >
                        {item.categories.map((cat) => (
                          <li
                            key={cat}
                            className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-900"
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </header>

                  <dl className="grid grid-cols-1 gap-1.5 border-t border-slate-200 pt-3 text-sm text-slate-700">
                    <div>
                      <dt className="inline font-semibold text-slate-900">
                        Phone:{' '}
                      </dt>
                      <dd className="inline">{item.phone || '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-900">
                        Address:{' '}
                      </dt>
                      <dd className="inline">{item.address || '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-900">
                        Website:{' '}
                      </dt>
                      <dd className="inline">{item.website || '—'}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-900">
                        Email:{' '}
                      </dt>
                      <dd className="inline">{item.email || '—'}</dd>
                    </div>
                  </dl>

                  <footer className="toolbar flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 pt-3">
                    <button
                      type="button"
                      onClick={() => startEditing(item, false)}
                      aria-label={`Edit ${item.name}`}
                      className="rounded-lg border-2 border-sky-800 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-900 hover:bg-sky-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(item)}
                      aria-label={`Delete ${item.name}`}
                      className="rounded-lg border-2 border-red-300 bg-white px-3.5 py-2 text-sm font-bold text-red-700 hover:bg-red-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                    >
                      Delete
                    </button>
                  </footer>
                </article>
              </li>
            )
          })}
        </ul>
      </main>

      {/* Commit Instructions Modal Dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        {...({ closedby: 'any' } as Record<string, string>)}
        className="m-auto w-full max-w-2xl rounded-2xl border border-slate-300 bg-white p-0 text-slate-900 shadow-2xl"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 id={dialogTitleId} className="text-xl font-bold text-slate-900">
              How to Commit &amp; Publish Your Resource Updates
            </h2>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close commit instructions"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                Close
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-700 sm:text-base">
            <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-4 text-amber-950">
              <p className="font-bold">
                Important: You must also update the Spanish entry!
              </p>
              <p className="mt-1 text-sm">
                Whenever you add, edit, or delete an organization in{' '}
                <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono font-semibold">
                  English
                </code>
                , you <strong>must</strong> switch to{' '}
                <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono font-semibold">
                  Español
                </code>{' '}
                at the top of the dashboard and make the corresponding update to
                the Spanish entry before committing your changes.
              </p>
            </div>

            <p>
              Every time you click <strong>Save</strong> on a card, your changes
              are written directly to{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-900">
                src/data/english.json
              </code>{' '}
              or{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-900">
                src/data/spanish.json
              </code>
              .
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-900">
                Once you have made all updates:
              </h3>
              <ul>
                <li>- Create a branch against main called <code>firstname-lastname-timestamp</code></li>
                <li>- Publish the branch in the <a href="https://github.com/unmemero/svdp-rogers-resource-page/settings/pages">Repo</a> and create a Pull Request (if you don't have access to the repo, please email <a href="mailto:fafagm99@gmail.com">Rafael Garcia</a>)</li>
                <li>- Contact one of the approves via Whatsapp to get the changes merged</li>
              </ul>
            </div>
          </div>

          <form
            method="dialog"
            className="flex justify-end border-t border-slate-200 pt-4"
          >
            <button
              type="submit"
              autoFocus
              className="rounded-lg bg-sky-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Got it
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

