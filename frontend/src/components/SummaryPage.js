import React, { useEffect, useState, useRef } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { useAxiosGet, useFetch } from '../hooks/useFetch';
import { buildCities } from '../helpers/utilities';
import { FormSelect } from './FormSelect';

export const SummaryPage = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [city, setCity] = useState('');

    const [ data, setData ] = useState([]);
    const [ selectedCity, setSelectedCity ] = useState(city);
    const [ optionsCity, setOptionsCity ] = useState(null);

    const { response: responseDate, fetchData: handleGetDates } = useAxiosGet();
    const { response: responseCity, fetchData: handleGetCity } = useAxiosGet();

    const { isLoading: loadingDates, data: dataDates, error: errorDates } = responseDate;
    const { isLoading: loadingCity, data: dataCity, error: errorCity } = responseCity;

    const refCities = useRef(true);
    const { isLoading, data: dataCities, error } = useFetch({
        method: 'GET',
        url: 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1300'
    }, refCities);

    useEffect(() => {
        if(!isLoading && dataCities !== null)
            setOptionsCity(buildCities(dataCities));
    }, [dataCities, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(startDate !== '' && endDate !== '') handleGetDates(`user/betweenDates?startDate=${startDate}&endDate=${endDate}`);
        else if(selectedCity.label !== '') handleGetCity(`user/byCity/${selectedCity.label.trim()}`);

        resetSearch()

    }

    const resetSearch = () => {
        setStartDate('');
        setEndDate('');
        setSelectedCity({label: '', value: ''})
    }

    const exportToCSV = (csvData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const dataForExcel = csvData.map(({ id, ...item }) => ({
            ...item,
            previousConditions: item.previousConditions.map(
                condition => condition.previousCondition
                ).join(", ")
        }));
    
        const ws = XLSX.utils.json_to_sheet(dataForExcel);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    

    useEffect(() => {
        if(!loadingDates) setData(dataDates);
    }, [dataDates, loadingDates]);

    useEffect(() => {
        if(!loadingCity) setData(dataCity);
    }, [dataCity, loadingCity]);

    return (
        <>
            <div className='container'>
                <form className='row' onSubmit={handleSubmit}>
                    <div className='row g-3'>
                        <div className='col-md-8'>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </div>
                        <div className='col-md-4'>
                            <FormSelect selected={selectedCity} setSelected={setSelectedCity} options={optionsCity} multi={false} title={'City'} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-12 g-3 text-center">
                            <button className="btn btn-primary" type="submit">Submit form</button>
                        </div>
                    </div>
                </form>
                <div className='row p-3'>
                    <div className='container'>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Zip Code</TableCell>
                                    <TableCell>Land Line</TableCell>
                                    <TableCell>Cellular Phone</TableCell>
                                    <TableCell>Had COVID-19?</TableCell>
                                    <TableCell>Conditions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.dateOfBirth}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                        <TableCell>{row.zipCode}</TableCell>
                                        <TableCell>{row.landline}</TableCell>
                                        <TableCell>{row.cellularPhone}</TableCell>
                                        <TableCell>{row.infected ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{row.previousConditions.map(condition => condition.previousCondition).join(', ')}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            data.length > 0 && (
                                <div className='row'>
                                    <div className='col-12 g-3 text-center'>
                                        <button className='btn btn-warning' onClick={(e) => exportToCSV(data,"data")}>Export</button>
                                    </div>
                                </div>
                                
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};


