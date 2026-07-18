import { Info } from 'lucide-react'

// Renders an array of simple content blocks. Shared by blog, tutorials, and
// recipe notes. Block types: 'p', 'h2', 'h3', 'ul', 'ol', 'callout', 'quote',
// 'table' ({ headers: string[], rows: string[][] }).
function Block({ block }) {
  switch (block.type) {
    case 'table':
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-surface/70 text-xs uppercase tracking-wide text-muted">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-5 py-4 font-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, i) => (
                <tr key={i} className="transition-colors hover:bg-white/[0.03]">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-4 ${j === 0 ? 'font-600 text-fg' : 'text-muted'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'h2':
      return <h2 className="mt-10 text-2xl font-700 text-fg">{block.text}</h2>
    case 'h3':
      return <h3 className="mt-7 text-lg font-600 text-green">{block.text}</h3>
    case 'p':
      return <p className="mt-4 leading-relaxed text-muted">{block.text}</p>
    case 'ul':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mt-4 space-y-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-700 text-green" aria-hidden="true">{i + 1}</span>
              <span className="pt-0.5 leading-relaxed">{it}</span>
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-green/25 bg-green/5 px-4 py-3">
          <Info size={18} className="mt-0.5 shrink-0 text-green" />
          <p className="text-sm leading-relaxed text-fg">{block.text}</p>
        </div>
      )
    case 'quote':
      return <blockquote className="mt-6 border-l-2 border-purple pl-4 text-lg italic text-fg">{block.text}</blockquote>
    default:
      return null
  }
}

export default function ContentBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  )
}
