import { useState } from 'react'
import { FiDownload, FiPrinter } from 'react-icons/fi'
import syllabi from '../../data/syllabi'

function toCSVForSyllabus(rows: { subject: string }[]) {
    if (!rows.length) return ''
    const lines = ['Subject']
    for (const r of rows) lines.push(`"${String(r.subject).replace(/"/g, '""')}"`)
    return lines.join('\n')
}

export default function SyllabusDownload() {
    const levels = Object.keys(syllabi)
    const [level, setLevel] = useState(levels[0])
    const rows = (syllabi as Record<string, string[]>)[level].map(s => ({ subject: s }))

    function downloadCSV() {
        const csv = toCSVForSyllabus(rows)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${level.replace(/\s+/g, '_')}_syllabus.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    function openPrintView() {
        const html = `
      <html>
        <head>
          <title>${level} Syllabus</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}ul{font-size:16px}</style>
        </head>
        <body>
          <h1>${level} — Syllabus</h1>
          <ul>
            ${rows.map(r => `<li>${r.subject}</li>`).join('')}
          </ul>
        </body>
      </html>
    `
        const w = window.open('', '_blank')
        if (!w) return
        w.document.write(html)
        w.document.close()
        w.focus()
    }

    return (
        <div className="card p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-primary">Syllabus (Class-wise)</h3>
                <div className="flex items-center gap-2">
                    <button onClick={downloadCSV} className="btn btn-primary flex items-center gap-2"><FiDownload /> CSV</button>
                    <button onClick={openPrintView} className="btn btn-outline flex items-center gap-2"><FiPrinter /> Print / PDF</button>
                </div>
            </div>

            <div className="mb-4">
                <label className="text-sm text-gray-mid">Select Class</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full mt-2 p-2 border rounded-md">
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            <ul className="list-disc pl-5 space-y-2">
                {rows.map((r, i) => (
                    <li key={i} className="text-gray-dark font-body">{r.subject}</li>
                ))}
            </ul>
        </div>
    )
}
