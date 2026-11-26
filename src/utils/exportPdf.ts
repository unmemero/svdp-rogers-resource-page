import { LAST_UPDATED, LAST_UPDATED_ES } from '../data/categories'
import type { Language, Resource, Translations } from '../types'

interface ExportPdfOptions {
  resources: Resource[]
  language: Language
  t: Translations
  selectedCategory: string | null
  query: string
}

export async function exportResourcesToPdf({
  resources,
  language,
  t,
  selectedCategory,
  query,
}: ExportPdfOptions): Promise<void> {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ])

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 36
  const lastUpdate = language === 'en' ? LAST_UPDATED : LAST_UPDATED_ES

  // Header
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(12, 74, 110) // sky-900
  doc.text(t.siteTitle, marginX, 42)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(51, 65, 85) // slate-700

  const filterParts: string[] = []
  if (selectedCategory) filterParts.push(selectedCategory)
  if (query.trim()) filterParts.push(`"${query.trim()}"`)

  const subtitle =
    filterParts.length > 0
      ? `${t.siteSubtitle} — ${filterParts.join(' | ')} (${resources.length})`
      : `${t.siteSubtitle} (${resources.length})`

  doc.text(subtitle, marginX, 58)
  doc.setFontSize(8.5)
  doc.setTextColor(100, 116, 139) // slate-500
  doc.text(`${lastUpdate} • ${t.disclaimerAccuracy}`, marginX, 72, {
    maxWidth: pageWidth - marginX * 2,
  })

  const rows = resources.map((r) => {
    const contactLines: string[] = []
    if (r.phone) contactLines.push(r.phone)
    if (r.email) contactLines.push(r.email)
    if (r.website) contactLines.push(r.website)

    const locationAndNotes: string[] = []
    if (r.address) locationAndNotes.push(r.address)
    if (r.notes) locationAndNotes.push(r.notes)

    return [
      r.name,
      r.categories.join(', '),
      contactLines.join('\n') || '—',
      locationAndNotes.join('\n') || '—',
    ]
  })

  autoTable(doc, {
    startY: 92,
    margin: { left: marginX, right: marginX, bottom: 42 },
    head: [
      language === 'en'
        ? ['Organization', 'Categories', 'Contact', 'Address & Notes']
        : ['Organización', 'Categorías', 'Contacto', 'Dirección y Notas'],
    ],
    body: rows,
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 5,
      textColor: [15, 23, 42],
      overflow: 'linebreak',
      valign: 'top',
    },
    headStyles: {
      fillColor: [12, 74, 110],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 135, fontStyle: 'bold' },
      1: { cellWidth: 110 },
      2: { cellWidth: 145 },
      3: { cellWidth: 'auto' },
    },
    didDrawPage: (data) => {
      const pageCount = doc.getNumberOfPages()
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(100, 116, 139)
      doc.text(
        t.pageOf(data.pageNumber, pageCount),
        pageWidth - marginX,
        pageHeight - 20,
        { align: 'right' },
      )
      doc.text(t.footerAttribution(lastUpdate), marginX, pageHeight - 20)
    },
  })

  const slug = selectedCategory
    ? selectedCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : 'all'
  doc.save(`svdp-rogers-resources-${slug}.pdf`)
}
