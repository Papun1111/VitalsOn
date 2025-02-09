import appointment_img from './appointment_img.png'
import header_img from './header_img.jpg'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr.Anik Mukhirjee',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Anik Mukhirjee specializes in comprehensive primary care, managing both acute and chronic illnesses across all ages. Emphasizes preventive care and the overall maintenance of patients’ health.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr.Abhijet Bag',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Abhijet Bag focuses on women\'s health, including all aspects of reproductive health from puberty through menopause. Expertise in prenatal care, reproductive management, and routine screenings.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Laura Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Laura Patel is dedicated to treating a wide variety of skin conditions from acne to eczema, and skin cancer screening. Committed to enhancing skin health and beauty using the latest treatments and technologies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Phungsuk Wangdu Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Phungsuk Wangdu Lee provides compassionate and comprehensive medical care for children from birth to adolescence, including preventive health maintenance, developmental assessments, and treating acute and chronic illnesses.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Papun Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Papun Garcia offers expertise in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles. Focus on patient-centered care for conditions like epilepsy, stroke, and migraines.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Liam Paybe',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Liam Paybe offers expertise in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles. Focus on patient-centered care for conditions like epilepsy, stroke, and migraines.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Kim yun',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kim Yun specializes in comprehensive primary care, managing both acute and chronic illnesses across all ages. Emphasizes preventive care and the overall maintenance of patients’ health.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Kyle jen',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Kyle Jen focuses on women\'s health, including all aspects of reproductive health from puberty through menopause. Expertise in prenatal care, reproductive management, and routine screenings.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Meth Mohapatra',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Meth Mohapatra is dedicated to treating a wide variety of skin conditions from acne to eczema, and skin cancer screening. Committed to enhancing skin health and beauty using the latest treatments and technologies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. coc aine',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Coc Aine provides compassionate and comprehensive medical care for children from birth to adolescence, including preventive health maintenance, developmental assessments, and treating acute and chronic illnesses.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Z',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Z offers expertise in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles. Focus on patient-centered care for conditions like epilepsy, stroke, and migraines.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Neil Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Neil Harris offers expertise in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles. Focus on patient-centered care for conditions like epilepsy, stroke, and migraines.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Laksh Nayak',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Laksh Nayak specializes in comprehensive primary care, managing both acute and chronic illnesses across all ages. Emphasizes preventive care and the overall maintenance of patients’ health.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Zayn Mallik',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Zayn Mallik focuses on women\'s health, including all aspects of reproductive health from puberty through menopause. Expertise in prenatal care, reproductive management, and routine screenings.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Eva Admas',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Eva Admas is dedicated to treating a wide variety of skin conditions from acne to eczema, and skin cancer screening. Committed to enhancing skin health and beauty using the latest treatments and technologies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
];
