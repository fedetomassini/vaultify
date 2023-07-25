import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faFingerprint } from '@fortawesome/free-solid-svg-icons';

import ModuleStyles from '../src/Assets/Styles/App.module.scss';
import website_logo  from '../src/Assets/Images/website.png';

import PasswordContainer from './Components/Passwords/Passwords';

const App = () => {
	return(
		<>
		<header>
			<h1 id={ModuleStyles.title}>SafePass <FontAwesomeIcon icon={faFingerprint}/></h1>
			<img id={ModuleStyles.website_logo} src={website_logo} heigth={32} width={32} title={'SafePass by Federico Tomassini'}/>
			<a id={ModuleStyles.feedback} href='https://github.com/fedetomassini/safepass/issues' target='_blank'><FontAwesomeIcon icon={faMessage} size='xl' title={'Send Feedback!'}/></a>
		</header>

		<PasswordContainer/>

		<section id={ModuleStyles.copyrightContainer}>
			<p id={ModuleStyles.copyrightMessage}>Made by <a href='https://github.com/fedetomassini' target='_blank'>@fedetomassini</a></p>
		</section>

		</>
	)
}

export default App;