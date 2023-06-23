import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faTrashCan, faLock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
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
                title: 'SafePass',
                text: `You need to generate a password first :)`,
                icon: 'error',
                showConfirmButton: true,
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
                title: 'SafePass',
                text: `${password} \ has been copied to clipboard successfully!`,
                icon: 'success',
                showConfirmButton: true,
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

    const clearStorage = (savedPasswords) => {
        const STORAGE_CONTAINER = localStorage.getItem('LatestPasswords', savedPasswords);
        if(localStorage.length === 0){
            Swal.fire({
                title: 'SafePass',
                icon: 'info',
                text: 'The passwords list is empty.',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
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
                text: `The passwords list has been cleared successfully! \ Reloading website...`,
                icon: 'success',
                timer: 1750,
                timerProgressBar: true,
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

    const GENERATOR_BTN = useRef(null);
    const STORAGE_LENGTH = localStorage['LatestPasswords'].length;
    const IS_FULL_STORAGE = localStorage.getItem('isFullStorage');

    useEffect(() => {
        if (GENERATOR_BTN.current){
            if (STORAGE_LENGTH >= 281 || IS_FULL_STORAGE === 'true'){
                GENERATOR_BTN.current.disabled = true;
                // Funciona correctamente, solo queda por ver que se actualice al momento sin necesidad de reiniciar el DOM.
            }
        }
    }, []);

	return(
		<>
		<section className={PasswordStyles.passwordGenContainer}>
			<input type='text' placeholder='Your password will go here...' disabled value={password}></input>
            <button onClick={copyToClipboard}><ClipboardCopyIcon id={PasswordStyles.clipboardIcon}/></button>
		</section>

        <section className={PasswordStyles.buttonContainer}>
            <button id={PasswordStyles.passwordGeneratorBtn} disabled={false} ref={GENERATOR_BTN} onClick={generatePassword}><FontAwesomeIcon icon={faKey}/></button> 
            <button id={PasswordStyles.clearStorageBtn} onClick={clearStorage}><FontAwesomeIcon icon={faTrashCan}/></button>  
        </section>
		</>
	)
}






// # ------------------------------------------- # \\
// # ------------------------------------------- # \\
// # ------------------------------------------- # \\
// # ------------------------------------------- # \\







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
        }else {
            Swal.fire({
                title: 'SafePass',
                text: `The storage limit has been reached: [${MAX_PASSWORDS}] PASSWORDS`,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor: '#41644A',
                confirmButtonText: 'I understand',
                footer: '<div style="text-align: center">There is a limit of 10 passwords to be saved on your browser storage</div>',
                allowEscapeKey: false,
                allowEnterKey: false,
                allowOutsideClick: false,
                heightAuto: true,
                width: 425,
                background: "#232924",
                color: "#8B97A2"
            })
            localStorage.setItem('isFullStorage', true)
            console.info(`%cThe storage limit has been reached: [${MAX_PASSWORDS}] PASSWORDS`, 'color: #B04759');
        }
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        Swal.fire({
          title: 'SafePass',
          text: `${password} has been copied to clipboard successfully!`,
          icon: 'success',
          showConfirmButton: true,
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