import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';
import { ClipboardCopyIcon } from '@radix-ui/react-icons';


import PasswordStyles from  '../Passwords/Passwords.module.scss';

// # ------------------------------------------- # \\

const PasswordGenerator = ({ onSavePassword }) => {
    
    const [password, setPassword] = useState('');

	const generatePassword = () => {      
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*.-+_%{}';
        let newPassword = '';

        for (let i = 0; i < 25; i++) {
            newPassword += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        setPassword(newPassword);
        onSavePassword(newPassword);
        console.info('%c '+ newPassword + '%c has been created!', 'color: #5C8984', 'color: #8B97A2');
    };

    const copyToClipboard = () => {
        if(password === ''){
            Swal.fire({
                title: '<span style="color: #FFABAB; font-weight: bold;">SafePass</span>',
                timer: 3750,
                timerProgressBar: true,
                html: `<span style="font-weight: bold;">You need to generate a password first :)</span>`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'Oops, ok!',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
        }else{
            navigator.clipboard.writeText(password);
            Swal.fire({
                title: '<span style="color: #FFABAB; font-weight: bold;">SafePass</span>',
                timer: 3750,
                timerProgressBar: true,
                html: `<span style="color: #3fcf8e; font-weight: bold;">${password}</span> has been copied to clipboard successfully!`,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Alr, thank you!',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
            console.info('%c '+ password + '%c has been copied to clipboard!', 'color: #5C8984', 'color: #8B97A2');
        }         
    };

    const clearStorage = () => {
        const STORAGE_CONTAINER = JSON.parse(localStorage.getItem('LatestPasswords'));
        if(!STORAGE_CONTAINER || STORAGE_CONTAINER.length === 0){
            Swal.fire({
                title: '<span style="color: #FFABAB; font-weight: bold;">SafePass</span>',
                timer: 3750,
                timerProgressBar: true,
                icon: 'info',
                html: '<span style="font-weight: bold;">The passwords list is empty.</span>',
                showConfirmButton: true,
                confirmButtonText: 'Oops!',
                confirmButtonColor: '#41644A',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
        }else{
            localStorage.clear(STORAGE_CONTAINER);
            console.clear();
            Swal.fire({
                timer: 1750,
                timerProgressBar: true,
                html: `<span style="font-weight: bold;">The passwords list has been cleared successfully! \ Reloading website...</span>`,
                icon: 'success',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
            setTimeout(() => {
                location.reload();
            }, 1750);
            console.info('%cStorage has been cleared successfully!', 'color: #3E6D9C');
        }
    }

    if(localStorage.length === 0){
        localStorage.setItem('isFullStorage', false);
        localStorage.setItem('LatestPasswords', JSON.stringify([]));
    }

    // Comportamiento del botón para generar contraseñas \\
    const [generatorBtnDisabled, setGeneratorBtnDisabled] = useState(false);
    const STORAGE_LENGTH = localStorage['LatestPasswords'].length;
    const IS_FULL_STORAGE = localStorage.getItem('isFullStorage');

    useEffect(() => {
        if (STORAGE_LENGTH >= 309.1 || IS_FULL_STORAGE === 'true') {
          setGeneratorBtnDisabled(true);
          localStorage.setItem('isFullStorage', true)
        }
    }, [STORAGE_LENGTH, IS_FULL_STORAGE]);

	return(
		<>
		<section className={PasswordStyles.passwordGenContainer}>
			<input type='text' placeholder='Your password will go here...' disabled value={password}></input>
            <button onClick={copyToClipboard}><ClipboardCopyIcon id={PasswordStyles.clipboardIcon}/></button>
		</section>

        <section className={PasswordStyles.buttonContainer}>
            <button id={PasswordStyles.passwordGeneratorBtn} disabled={generatorBtnDisabled} onClick={generatePassword}><FontAwesomeIcon icon={faKey}/></button> 
            <button id={PasswordStyles.clearStorageBtn} onClick={clearStorage}><FontAwesomeIcon icon={faTrashCan}/></button>  
        </section>
		</>
	)
}






const PasswordContainer = () => {

    const MAX_PASSWORDS = 10;
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        const savedPasswords = JSON.parse(localStorage.getItem('LatestPasswords'));
        if (savedPasswords) {
            setPasswords(savedPasswords);
        }
    }, []);

    const savePassword = (newPassword) => {
        const prevPasswords = [...passwords, newPassword];
      
        if(prevPasswords.length <= MAX_PASSWORDS) {
            setPasswords(prevPasswords);
            localStorage.setItem('LatestPasswords', JSON.stringify(prevPasswords));
            // console.log(prevPasswords.length) //
        }else {
            Swal.fire({
                title: '<span style="color: #FFABAB; font-weight: bold;">SafePass</span>',
                timer: 10750,
                timerProgressBar: true,
                html: `<span style="font-weight: bold;">The storage limit has been reached: [<span style="color: #D14D72">${MAX_PASSWORDS}</span>] PASSWORDS</span>`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor: '#41644A',
                confirmButtonText: 'I understand',
                footer: '<div style="text-align: center">There is a limit of 10 passwords to be saved on your browser storage.</div>',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
            localStorage.setItem('isFullStorage', true);
            console.info(`%cThe storage limit has been reached: [${MAX_PASSWORDS}] PASSWORDS`, 'color: #B04759');
        }
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        Swal.fire({
            title: '<span style="color: #FFABAB; font-weight: bold;">SafePass</span>',
            timer: 3750,
            timerProgressBar: true,
            html: `<span style="color: #3fcf8e; font-weight: bold;">${password}</span> has been copied to clipboard successfully!`,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'Alr, thank you!',
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            heightAuto: true,
            width: 425,
            background: '#232924',
            color: '#8B97A2',
        });
        console.info(`%c${password} has been copied to clipboard!`, 'color: #5C8984');
    };
    
    return(
        <>

        <PasswordGenerator onSavePassword={savePassword}/>

        <section className={PasswordStyles.passwordsContainer}>
            <h3 id={PasswordStyles.passwordsTitle}><FontAwesomeIcon icon={faLock}/> Your Passwords <FontAwesomeIcon icon={faLock}/></h3>
            {passwords.length > 0 ? (
                <ul className={PasswordStyles.lastPasswordsContainer} style={{maxHeight: '200px', overflowY: 'auto'}}>
                    {passwords.map((password, index) => (
                        <li key={index} onClick={() => copyToClipboard(password)}>{password}</li>
                    ))}
                </ul>
            ) : (
                <p id={PasswordStyles.noPasswords}>No passwords have been created!</p>
            )}
        </section>
        </>
    )
}

export default PasswordContainer;