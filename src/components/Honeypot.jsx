// A field people never see or reach with the keyboard. Bots that fill in
// every input fill this one too, and the submission is quietly dropped.
export default function Honeypot({ value, onChange }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
