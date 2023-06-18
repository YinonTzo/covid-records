import React from 'react';
import Select from 'react-select';

export const FormSelect = ({ selected, setSelected, options, multi, title = '' }) => {

    const onChange = (value) => {
        setSelected(value);
    }

    return(
        <>
            <div className="mb-3">
                <label className="form-label">{ title } </label>
                <Select
                    options={options}
                    isMulti={multi}
                    value={selected}
                    onChange={onChange}
                />
            </div>
        </>
    );
}