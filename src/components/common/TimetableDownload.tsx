import { useState } from 'react'
import { FiDownload, FiPrinter } from 'react-icons/fi'
import examTimetables from '../../data/examTimetable'

function toCSV(rows: Record<string, any>[]) {
    if (!rows.length) return ''
    const keys = Object.keys(rows[0])
    const lines = [keys.join(',')]
    for (const r of rows) lines.push(keys.map(k => `"${String(r[k]).replace(/"/g, '""')}"`).join(','))
    return lines.join('\n')
}

export default function TimetableDownload() {
    const levels = Object.keys(examTimetables)
    const [level, setLevel] = useState(levels[0])

    const rows = examTimetables[level]

    function downloadCSV() {
        const csv = toCSV(rows as any)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${level.replace(/\s+/g, '_')}_exam_timetable.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    function openPrintView() {
        const html = `
      <html>
        <head>
          <title>${level} Exam Timetable</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f4f4f4}</style>
        </head>
        <body>
          <h1>${level} — Exam Timetable</h1>
          <table>
            <thead><tr><th>Day</th><th>Time</th><th>Subject</th></tr></thead>
            <tbody>
              ${rows.map(r => `<tr><td>${r.day}</td><td>${r.time}</td><td>${r.subject}</td></tr>`).join('')}
            </tbody>
          </table>
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
                <h3 className="font-display font-bold text-primary">Download Exam Timetable</h3>
                <div className="flex items-center gap-2">
                    <button onClick={downloadCSV} className="btn btn-primary flex items-center gap-2"><FiDownload /> CSV</button>
                    <button onClick={openPrintView} className="btn btn-outline flex items-center gap-2"><FiPrinter /> Print / PDF</button>
                </div>
            </div>

            <div className="mb-4">
                <label className="text-sm text-gray-mid">Select Level</label>
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full mt-2 p-2 border rounded-md">
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200"><th className="py-2 text-left font-label text-gray-mid">Day</th><th className="py-2 text-left font-label text-gray-mid">Time</th><th className="py-2 text-left font-label text-gray-mid">Subject</th></tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-b border-gray-50"><td className="py-2">{r.day}</td><td className="py-2">{r.time}</td><td className="py-2 font-semibold">{r.subject}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
