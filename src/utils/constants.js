import profile1 from '../assets/profiles/1.jpg';
import profile2 from '../assets/profiles/2.jpg';
import profile3 from '../assets/profiles/3.jpg';
import profile4 from '../assets/profiles/4.jpg';
import profile5 from '../assets/profiles/5.jpg';
import profile6 from '../assets/profiles/6.jpg';
import profile7 from '../assets/profiles/7.jpg';
import profile8 from '../assets/profiles/8.jpg';
import profile9 from '../assets/profiles/9.jpg';

const getRandomHashIndex = (userId, len) => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = (hash + userId.charCodeAt(i)) % len;
    }
    return hash;
  };

const defaultImages = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9];
const randomSummaries = [
    "A dedicated professional with extensive experience in project management, committed to delivering high-quality results on time. Skilled in team collaboration, problem-solving, and adapting to new challenges, ensuring project goals are met efficiently.",
    "An innovative thinker with a strong background in software development, applying creativity and technical skills to solve complex problems. Experienced in leading projects and delivering solutions that enhance business operations and user experience.",
    "A collaborative team player with a proven track record in customer service and team management. Committed to supporting team members and achieving collective goals through effective communication and strategic planning.",
    "An adaptable and resilient professional with experience in fast-paced environments, managing multiple tasks with precision. Skilled in logistics and operations, ensuring smooth workflow and timely completion of projects.",
    "A detail-oriented analyst with a focus on accuracy and efficiency in data processing and financial reporting. Committed to providing precise results that support strategic business decisions and performance improvements.",
    "A results-driven sales manager with a focus on achieving targets and driving business growth. Experienced in developing strategies, leading sales teams, and fostering client relationships to exceed performance goals.",
    "An effective communicator with a flair for public speaking and building professional relationships. Skilled in negotiation and persuasion, with a track record of successful project pitches and stakeholder management.",
    "A committed lifelong learner with a passion for technology and innovation. Continuously seeking opportunities to acquire new skills in AI and machine learning, aiming to apply these in practical, impactful ways within the tech industry.",
    "A resourceful problem-solver with a positive outlook, tackling challenges head-on and finding innovative solutions. Experienced in IT support and systems troubleshooting, ensuring optimal operational efficiency and user satisfaction.",
];
const tagColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "cyan",
    "blue",
    "geekblue",
    "purple"
]

var currency_symbols = {
  'USD': '$', // US Dollar
  'EUR': '€', // Euro
  'CRC': '₡', // Costa Rican Colón
  'GBP': '£', // British Pound Sterling
  'ILS': '₪', // Israeli New Sheqel
  'INR': '₹', // Indian Rupee
  'JPY': '¥', // Japanese Yen
  'KRW': '₩', // South Korean Won
  'NGN': '₦', // Nigerian Naira
  'PHP': '₱', // Philippine Peso
  'PLN': 'zł', // Polish Zloty
  'PYG': '₲', // Paraguayan Guarani
  'THB': '฿', // Thai Baht
  'UAH': '₴', // Ukrainian Hryvnia
  'VND': '₫', // Vietnamese Dong
};

export default { defaultImages, randomSummaries, tagColors, currency_symbols, getRandomHashIndex };