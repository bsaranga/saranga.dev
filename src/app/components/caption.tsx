export default function Caption({ text }: { text: string }) {
  return (
    <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
      { text }
    </p>
  )
}