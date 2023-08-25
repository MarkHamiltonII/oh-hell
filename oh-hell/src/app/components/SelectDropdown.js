const DEFAULT_OPTIONS = ["1", "2", "3", "4", "5", "6"]

export default function SelectDropdown({ label, options=DEFAULT_OPTIONS, changeHandler, placeHolder }) {

    return (
        <div className="flex-col">
            <label htmlFor="number-of-players" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <select id="number-of-players" onChange={(value) => changeHandler(value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={null}>
                <option value={null}>{placeHolder}</option>
                {options.map(o => (<option key={o} value={o}>{o}</option>))}
            </select>
        </div>
    )
}