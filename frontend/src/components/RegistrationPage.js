import React, { useRef, useEffect, useState, useCallback } from 'react'
import Select from 'react-select';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useForm } from '../hooks/useForm';
import { useFetch, useAxiosPost } from '../hooks/useFetch';
import { validatorForm } from '../helpers/validatorForm';
import { FormSelect } from './FormSelect';
import { buildCities } from '../helpers/utilities'

export const RegistrationPage = () => {

    const [ newUser, setNewUser ] = useState(null);
    const [ formValues, handleInputChange ] = useForm({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        city: '',
        zip_code: '',
        landline: '',
        cellularPhone: ''
    });

    const { firstName, lastName, birthDate,
            address, city, zip_code, landline,
            cellularPhone } = formValues;

    const [ selectedCity, setSelectedCity ] = useState(city);
    const [ selectedPrevious, setSelectedPrevious ] = useState([]);
    const [ optionsCity, setOptionsCity ] = useState(null);
    const [ otherContent, setOtherContent ] = useState('');
    const [ isInfectedBefore, setIsInfectedBefore ] = useState(false);

    const [ errorDate, setErrorDate ] = useState('');
    const [ errorFirstName, setErrorFirstName ] = useState('');
    const [ errorLastName, setErrorLastName ] = useState('');
    const [ errorAddress, setErrorAddress ] = useState('');
    const [ errorCity, setErrorCity ] = useState('');
    const [ errorZipCode, setErrorZipCode ] = useState('');
    const [ errorLandLine, setErrorLandLine ] = useState('');
    const [ errorCellular, setErrorCellular ] = useState('');

    const refCities = useRef(true);
    const otherBox = selectedPrevious.some(element => element.label === 'Other');

    const { isLoading, data, error } = useFetch({
        method: 'GET',
        url: 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1300'
    }, refCities);

    const { response, fetchData: handleSubmitPost } = useAxiosPost(newUser);
    const { isLoading: loadingPost, data: dataPost, error: errorPost } = response;

    useEffect(() => {
        return () => {
            setNewUser(null);
            refCities.current = true;
        }
    }, []);

    useEffect(() => {
        if(!isLoading && data !== null)
            setOptionsCity(buildCities(data));
    }, [data, isLoading]);

    const updateUser = useCallback( () => {
        if(firstName !== '' && lastName !== '' && address !== '' && selectedCity.label !== '' && cellularPhone !== ''){
            setNewUser({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                birthDate: birthDate,
                address: address.trim(),
                city: selectedCity?.label,
                // zip_code: zip_code,
                landline: landline.trim(),
                cellularPhone: cellularPhone.trim(),
                infected: isInfectedBefore,
                previousConditions: selectedPrevious.map(element => ({ previousCondition: element.value.trim()}))
            })
        }
    }, [address, birthDate, cellularPhone, firstName, isInfectedBefore, landline, lastName, selectedCity.label, selectedPrevious]);

    useEffect(() => {
        updateUser();
    }, [updateUser]);

    useEffect(() => {
        if(birthDate !== ''){
            if(!moment(birthDate).isValid())
                setErrorDate("Invalid date!")
            else if(moment(birthDate).isAfter(new Date()))
                setErrorDate("You can't choice this date")
            else
                setErrorDate("");
        }
    }, [birthDate]);

    useEffect(() => {
        if(selectedCity !== '') console.log(selectedCity);
    }, [selectedCity]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setNewUser({
            ...newUser,
            city: selectedCity?.label?.trim()
        })

        if(validateValues())
            handleSubmitPost();
    }

    useEffect(() => {
        if(!loadingPost){
            if(dataPost){
                Swal.fire('User was saved.', '', 'success');

            }else{
                Swal.fire({
                    title: "Oops..",
                    icon: "error",
                    text: errorPost
                })
            }
        }
    }, [dataPost, errorPost, loadingPost]);

    const validateValues = () => {
        let v1 = validatorForm.validNotEmpty(firstName);
        let v2 = validatorForm.validNotEmpty(lastName);
        let v3 = validatorForm.validNotEmpty(birthDate);
        let v4 = validatorForm.validNotEmpty(address);
        let v5 = validatorForm.validNotEmpty(selectedCity?.label ? selectedCity?.label : '' );
        let v6 = validatorForm.validNotEmpty(zip_code);
        let v7 = validatorForm.validNotEmpty(landline);
        let v8 = validatorForm.validNotEmpty(cellularPhone);

        setErrorFirstName(v1.isValid ? '' : v1.message);
        setErrorLastName(v2.isValid ? '' : v2.message);
        setErrorDate(v3.isValid ? '' : v3.message);
        setErrorAddress(v4.isValid ? '' : v4.message);
        setErrorCity(v5.isValid ? '' : v5.message);
        // setErrorLandLine(v7.isValid ? '' : v7.message);
        setErrorCellular(v8.isValid ? '' : v8.message);

        const v9 = v1.isValid && v2.isValid && v3.isValid && v4.isValid && v5.isValid && v8.isValid;

        if(v9){
            let vFirstName = validatorForm.hasOnlyLetters(firstName);
            let vLastName = validatorForm.hasOnlyLetters(lastName);
            let vCellular = validatorForm.isCellularNumber(cellularPhone);
            let vLandLine = {
                isValid: true
            }, vZipCode = {
                isValid: true
            }

            if(v6.isValid)
                vZipCode = validatorForm.validateZipCode(zip_code);
            
            if(v7.isValid) vLandLine = validatorForm.isLandLineNumber(landline);

            setErrorFirstName(vFirstName.isValid ? '' : vFirstName.message);
            setErrorLastName(vLastName.isValid ? '' : vLastName.message);
            setErrorCellular(vCellular.isValid ? '' : vCellular.message);
            setErrorLandLine(vLandLine.isValid ? '' : vLandLine.message);
            setErrorZipCode(vZipCode.isValid ? '' : vZipCode.message);

            return vFirstName.isValid && vLastName.isValid && vCellular.isValid && vZipCode.isValid && vLandLine.isValid;
        }
        return false;
    }

    const optionsPreviousConditions = [
        {label: 'Diabetes', value: 'Diabetes'},
        {label: 'Cardio-Vascular problems', value: 'Cardio-Vascular problems'},
        {label: 'Allergies', value: 'Allergies'},
        {label: 'Other', value: ''}
    ]

    useEffect(() => {
        if(otherBox && otherContent.length){
            const found = selectedPrevious.find(element => element.label === 'Other');

            if(found){
                const updatedSelectedPrevious = [ ...selectedPrevious ];
                const index = updatedSelectedPrevious.indexOf(found);
                updatedSelectedPrevious[ index ] = {
                    ...found,
                    value: otherContent
                };
                setSelectedPrevious( updatedSelectedPrevious );
            }
        }else if(!otherBox){
            const updatedSelectedPrevious = selectedPrevious.filter(element => element.label !== 'Other');
            setSelectedPrevious( updatedSelectedPrevious );
        }
    }, [otherBox, otherContent]);

    const handleCheckboxChange = (event) => {
        setIsInfectedBefore(event.target.checked);
    }
    

    return (
        <>
            <div className='container'>
                <form className="row" onSubmit={handleSubmit}>
                    <div className='row g-3'>
                        <div className="col-md-4">
                            <label className="form-label">First name</label>
                            <input 
                                type="text" 
                                name='firstName'
                                className="form-control" 
                                value={ firstName }
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorFirstName && <div className='text-danger errormessage'>{errorFirstName}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last name</label>
                            <input 
                                type="text" 
                                name='lastName'
                                className="form-control" 
                                value={ lastName }
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorLastName && <div className='text-danger errormessage'>{errorLastName}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Date of birth</label>
                            <input 
                                type="date" 
                                name='birthDate'
                                className="form-control" 
                                value={birthDate}
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorDate && <div className='text-danger errormessage'>{errorDate}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-4">
                            <label className="form-label">Address</label>
                            <input 
                                type="text" 
                                name='address'
                                className="form-control" 
                                value={ address }
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorAddress && <div className='text-danger errormessage'>{errorAddress}</div>}
                        </div>
                        <div className="col-md-4">
                            <FormSelect selected={selectedCity} setSelected={setSelectedCity} options={optionsCity} multi={false} title={'City'} />
                            {errorCity && <div className='text-danger errormessage'>{errorCity}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Zip code</label>
                            <input 
                                type="text" 
                                name='zip_code'
                                className="form-control" 
                                value={ zip_code }
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorZipCode && <div className='text-danger errormessage'>{errorZipCode}</div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-4">
                            <label className="form-label">Land line</label>
                            <input 
                                type="text" 
                                name='landline'
                                className="form-control" 
                                value={ landline }
                                onChange={ handleInputChange }
                                autoComplete='off'/>
                            {errorLandLine && <div className='text-danger errormessage'>{errorLandLine}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Cellular phone</label>
                            <input 
                                type="text" 
                                name='cellularPhone'
                                className="form-control" 
                                value={ cellularPhone }
                                onChange={ handleInputChange }
                                autoComplete='off' />
                            {errorCellular && <div className='text-danger errormessage'>{errorCellular}</div>}
                        </div>
                    </div>
                    <div className='row g-3'>
                        <div className='col-md-4'>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={isInfectedBefore}
                                    onChange={handleCheckboxChange} />
                                <label className="form-check-label">
                                    Infected by COVID-19 before?
                                </label>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <FormSelect selected={selectedPrevious} setSelected={setSelectedPrevious} options={optionsPreviousConditions} multi={true} title={'Previous Conditions:'}/>
                            {
                                otherBox && (
                                    <>
                                        <textarea
                                            value={otherContent}
                                            onChange={e => setOtherContent(e.target.value)}
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-12 g-3 text-center">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
        </>
    )
}
