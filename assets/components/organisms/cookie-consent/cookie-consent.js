/* globals jQuery */

let bannerElement
function cookieConsent(opt_visible) {
  if (bannerElement) {
    setVisibility(bannerElement, opt_visible)
  } else {
    window.cookieconsent.initialise(
      get_cookieconsent_config(),
      (popup) => {
        bannerElement = popup.element
        setVisibility(bannerElement, opt_visible)
      },
      (err) => console.error(err)
    )
    window.cookieconsent.initialise = (() => {})
  }
}

jQuery.fn.extend({ cookieConsent })
export default cookieConsent

function setVisibility(cookieBanner, visible) {
  if (visible === true) {
    jQuery(cookieBanner).show().removeClass("cc-invisible")
  } else if (visible === false) {
    jQuery(cookieBanner).hide().addClass("cc-invisible")
  }
}

function get_cookieconsent_config() {
    // Translation
    var cookieI18n = {
        en: {
        msg: 'By continuing your browsing on this site, you agree to the use ' +
            'of cookies to improve your user experience and to make statistics ' +
            'of visits.',
        link: 'Read the disclaimer',
        href: '//go.epfl.ch/privacy-policy'
        },
        fr: {
        msg: 'En poursuivant votre navigation sur ce site, vous acceptez ' +
            'l\'utilisation de cookies pour am&eacute;liorer votre ' +
            'exp&eacute;rience utilisateur et r&eacute;aliser des statistiques ' +
            'de visites.',
        link: 'Lire les mentions l&eacute;gales',
        href: '//go.epfl.ch/protection-des-donnees'
        },
        de: {
            msg: 'Die Navigation auf dieser Seite verwendet Cookies zur ' +
              'Verbesserung Ihrer Benutzererfahrung und zur Durchführung von Besucherstatistiken.',
            link: 'Datenschutzerklärung lesen',
            href: '//go.epfl.ch/privacy-policy'
        }
    };
    // Retrieve language, default 'fr'
    var langAttribute = document.documentElement.lang;
    var lang = langAttribute.substring(0, 2);
    if (! cookieI18n[lang]) {
        lang = 'fr';
    }

    // Retrieve the domain
    // Don't work with google.co.uk for example
    var domain_name = 'epfl.ch';
    var hostame = window.location.hostname;
    if ( hostame === 'localhost' || hostame === '127.0.0.1') {
        domain_name = hostame;
    } else {
        var hostParts = hostame.split('.').reverse();
        if (hostParts[0] !== undefined && hostParts[1] !== undefined) {
            domain_name = hostParts[1] + '.' + hostParts[0];
        }
    }

    var config = {
        "theme": "classic",
        "palette": {
        "popup": {
            "background": "rgba(69, 69, 69, 0.96)"
        },
        "button": {
            "background": "#b51f1f"
        }
        },
        "content": {
        "message": cookieI18n[lang].msg,
        "dismiss": "OK",
        "link": cookieI18n[lang].link,
        "href": cookieI18n[lang].href
        },
        "cookie": {
        "name": "petitpois", // Chosen by a magical unicorn!
        "domain": domain_name,
        "autoAttach": false // attach it manually to the end, or SEO will crawl it before any content
        }
    }
    return config;
}
