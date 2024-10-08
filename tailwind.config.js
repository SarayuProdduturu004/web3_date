

//  /** @type {import('tailwindcss').Config} */

//  module.exports = {
//     content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
//     theme: {
//       extend: {
//         fontFamily: {
//           custom: ['Poppins', 'Helvetica', 'sans-serif'],
//           num: ['Poppins'],
//           'viga': ['Viga', 'sans-serif'],

//         },
//         height: {
//           vh: '200vh',
//         },
//         fontWeight: {
//           custom: '600', 
//         },
//         fontSize: {
//           'hover-lg': ['1.125rem', { hover: '1.25rem' }], 
//         },
//         colors: {
//           'custom-red': '#c70039',
//           'custom-orange':'#ff5733',
//           'custom-purple': '#571845',
//           'feedbackColor':'#d9d9d9',
//           'walletColor':'#180C08'
//         },
//         translate: {
//           'full': '100%',
//           '-full': '-100%',
//         },
//         scale: {
//           '90': '0.9',
//         },
//       },
//       screens: {
//         sxxs: "255px",
//         sxs: "265px",
//         sxs1: "275px",
//         sxs2: "285px",
//         sxs3: "295px",
//         ss: "305px",
//         ss1: "315px",
//         ss2: "325px",
//         ss3: "335px",
//         ss4: "345px",
//         dxs: "375px",
//         xxs: "405px",
//         xxs1: "425px",
//         sm0: "445px",
//         sm1: "480px",
//         sm4: "508px",
//         sm2: "538px",
//         sm3: "550px",
//         sm5: "600px",
//         sm: "640px",
        
//         ipad: "768px",
//         md: "870px",
//         // md1: "870px",
//         md2: "914px",
//         md3: "936px",
//         lg: "976px",
//         dlg: "1024px",
//         lg1: "1100px",
//         lgx: "1134px",
//         dxl0: "1240px",
//         dxl: "1280px",
//         dxl1: "1380px",
//         xl: "1440px",
//         xl2: "1600px",
//         xl3: "1800px",
//         xl4: "2100px",
//       },
//     },
//     plugins: [],
//    }

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          color: '#576B70',
          option_color: '#738685',
          text_area: '#F0F0F0',
          wallColor: '#ECFCFF',
          circleColor: '#A8A2A2'
        },
        secondary: {
          dark_hover: '#475153'
        },
        // Combine all custom colors here
        'custom-red': '#c70039',
        'custom-orange': '#ff5733',
        'custom-purple': '#571845',
        'feedbackColor': '#d9d9d9',
        'walletColor': '#180C08'
      },
      fontFamily: {
        custom: ['Poppins', 'Helvetica', 'sans-serif'],
        num: ['Poppins'],
        'viga': ['Viga', 'sans-serif'],
      },
      height: {
        vh: '200vh',
      },
      fontWeight: {
        custom: '600',
      },
      fontSize: {
        'hover-lg': ['1.125rem', { hover: '1.25rem' }],
      },
      translate: {
        'full': '100%',
        '-full': '-100%',
      },
      scale: {
        '90': '0.9',
      },
    },
    screens: {
      sxxs: "255px",
      sxs: "265px",
      sxs1: "275px",
      sxs2: "285px",
      sxs3: "295px",
      ss: "305px",
      ss1: "315px",
      ss2: "325px",
      ss3: "335px",
      ss4: "345px",
      dxs: "375px",
      xxs: "405px",
      xxs1: "425px",
      sm0: "445px",
      sm1: "480px",
      sm4: "508px",
      sm2: "538px",
      sm3: "550px",
      sm5: "600px",
      sm: "640px",

      ipad: "768px",
      md: "870px",
      // md1: "870px",
      md2: "914px",
      md3: "936px",
      lg: "976px",
      dlg: "1024px",
      lg1: "1100px",
      lgx: "1134px",
      dxl0: "1240px",
      dxl: "1280px",
      dxl1: "1380px",
      xl: "1440px",
      xl2: "1600px",
      xl3: "1800px",
      xl4: "2100px",
    },
  },
  plugins: [],
}
