import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedin, faXTwitter);
