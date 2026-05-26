 import React, { useState, useEffect, useRef } from 'react';

import { Sparkles, Zap, Brain, Eye, MessageSquare, TrendingUp, FileSearch, Bot, Database, ChevronRight, Check, Clock, CreditCard, Upload, Star, ArrowRight, Send, Quote, Loader2, Package, FileCheck, Rocket, Mail, User, Copy, AlertCircle, ThumbsUp, ShieldCheck, Award, Headphones, Search, Menu, X } from 'lucide-react';


export default function JagoDataWebsite() {

const [page, setPage] = useState('home');

const [selectedService, setSelectedService] = useState(null);

const [selectedBoosters, setSelectedBoosters] = useState([]);

const [bookingStep, setBookingStep] = useState(1);

const [bookingData, setBookingData] = useState({

name: '', email: '', whatsapp: '', university: '', deadline: '', description: ''

});

const [orderId, setOrderId] = useState(null);

const [trackingId, setTrackingId] = useState('');

const [trackedOrder, setTrackedOrder] = useState(null);

const [trackError, setTrackError] = useState('');

const [testimonials, setTestimonials] = useState([]);

const [feedbackForm, setFeedbackForm] = useState({ name: '', university: '', service: '', rating: 5, message: '' });

const [feedbackSuccess, setFeedbackSuccess] = useState(false);

const [paymentProof, setPaymentProof] = useState(null);

const [paymentSubmitted, setPaymentSubmitted] = useState(false);

const [loading, setLoading] = useState(false);

const [copied, setCopied] = useState(false);

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [toast, setToast] = useState(null);


const showToast = (msg, type = 'info') => {

setToast({ msg, type });

setTimeout(() => setToast(null), 3000);

};


const navigate = (p) => {

setPage(p);

setMobileMenuOpen(false);

if (typeof window !== 'undefined') {

window.scrollTo({ top: 0, behavior: 'smooth' });

}

};


const services = [

{ id: 'ml', name: 'Classic Machine Learning', icon: Brain, price: 375000, desc: 'Cleaning data, feature engineering, training model (XGBoost, Random Forest, SVM).', tags: ['XGBoost', 'Random Forest', 'SVM'] },

{ id: 'stat', name: 'Statistical Forecasting', icon: TrendingUp, price: 450000, desc: 'Prediksi tren dengan ARIMA, SARIMA, Prophet untuk data time series.', tags: ['ARIMA', 'SARIMA', 'Prophet'] },

{ id: 'dl', name: 'Advanced Forecasting (DL)', icon: Zap, price: 700000, desc: 'Neural Network tangguh: LSTM, GRU, RNN untuk data kompleks.', tags: ['LSTM', 'GRU', 'RNN'] },

{ id: 'ocr', name: 'Basic OCR & Extraction', icon: FileSearch, price: 550000, desc: 'Ekstrak teks pakai Tesseract, EasyOCR, TrOCR plus cleaning dasar.', tags: ['Tesseract', 'EasyOCR', 'TrOCR'] },

{ id: 'smart-ocr', name: 'Smart OCR (Vision LLM)', icon: Eye, price: 750000, desc: 'Ekstraksi pintar Vision LLM untuk struk, invoice, dokumen kompleks.', tags: ['Vision LLM', 'GPT-4V', 'Structured'] },

{ id: 'genai', name: 'Gen-AI & Smart Assistant', icon: Bot, price: 750000, desc: 'Chatbot cerdas, Prompt Engineering, RAG untuk chat dengan dokumen.', tags: ['LLM', 'RAG', 'Prompt'] },

{ id: 'nlp', name: 'Text Mining & NLP', icon: MessageSquare, price: 550000, desc: 'Analisis Sentimen, Topic Modeling (LDA), TF-IDF, Naive Bayes.', tags: ['Sentiment', 'LDA', 'TF-IDF'] },

{ id: 'cv', name: 'Advanced Computer Vision', icon: Eye, price: 850000, desc: 'YOLO deteksi objek, klasifikasi gambar, arsitektur CNN kustom.', tags: ['YOLO', 'CNN', 'Detection'] },

];


const boosters = [

{ id: 'ui', name: 'UI/Web App Deployment', price: 250000, desc: 'Streamlit, Gradio, FastAPI biar modelmu gampang didemoin.' },

{ id: 'writing', name: 'Technical Writing Assistant', price: 250000, desc: 'Bantu nulis narasi metodologi, evaluasi, interpretasi grafik.' },

{ id: 'pivot', name: 'Major Pivot / Revisi Besar', price: 150000, desc: 'Buat ganti dataset atau rombak algoritma total.' },

];


const stages = [

{ key: 'pending_payment', label: 'Menunggu DP', icon: CreditCard },

{ key: 'dp_verified', label: 'DP Terverifikasi', icon: ShieldCheck },

{ key: 'in_progress', label: 'Sedang Dikerjakan', icon: Loader2 },

{ key: 'ready_final', label: 'Siap Pelunasan', icon: Package },

{ key: 'final_paid', label: 'Pelunasan OK', icon: FileCheck },

{ key: 'delivered', label: 'Hasil Dikirim', icon: Rocket },

];


useEffect(() => {

loadTestimonials();

}, []);


const loadTestimonials = async () => {

try {

const result = await window.storage.list('testimonial:', true);

if (result && result.keys && result.keys.length > 0) {

const items = await Promise.all(

result.keys.map(async (key) => {

try {

const r = await window.storage.get(key, true);

return r ? JSON.parse(r.value) : null;

} catch { return null; }

})

);

const valid = items.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);

setTestimonials(valid);

} else {

const seeds = [

{ id: 'seed1', name: 'Rara A.', university: 'Universitas Brawijaya', service: 'Advanced Forecasting (DL)', rating: 5, message: 'LSTM-nya jalan mulus banget, sidang lancar dapet A. Dosen sampe nanya pake referensi mana 😆', createdAt: Date.now() - 86400000 * 3 },

{ id: 'seed2', name: 'Bagas P.', university: 'ITS Surabaya', service: 'Smart OCR (Vision LLM)', rating: 5, message: 'Ekstrak invoice 300+ file dalam semalem. Awalnya skeptis, ternyata akurasinya mantep. Worth banget!', createdAt: Date.now() - 86400000 * 7 },

{ id: 'seed3', name: 'Sinta M.', university: 'UGM', service: 'Gen-AI & Smart Assistant', rating: 5, message: 'RAG chatbot buat skripsi gw beneran dipake dosen juga buat demo. Tim Jago Data responsif & sabar jawab pertanyaan.', createdAt: Date.now() - 86400000 * 14 },

{ id: 'seed4', name: 'Dimas R.', university: 'Telkom University', service: 'Classic Machine Learning', rating: 4, message: 'Datanya gw kotor parah, dibersihin sampe rapi. Modelnya XGBoost akurasi 0.91. Mantap.', createdAt: Date.now() - 86400000 * 21 },

{ id: 'seed5', name: 'Alya N.', university: 'IPB University', service: 'Text Mining & NLP', rating: 5, message: 'Analisis sentimen 10rb tweet, dosen langsung acc proposal. Cepet & detail dokumentasinya.', createdAt: Date.now() - 86400000 * 28 },

{ id: 'seed6', name: 'Reza H.', university: 'Universitas Padjadjaran', service: 'Advanced Computer Vision', rating: 5, message: 'YOLO deteksi daun penyakit, akurasi 94%. Bonus dapet streamlit app, presentasi auto kece.', createdAt: Date.now() - 86400000 * 35 },

];

for (const s of seeds) {

await window.storage.set(`testimonial:${s.id}`, JSON.stringify(s), true);

}

setTestimonials(seeds);

}

} catch (e) {

console.error('Load testimonials error', e);

}

};


const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');


const calculateTotal = () => {

const base = selectedService ? selectedService.price : 0;

const extras = selectedBoosters.reduce((sum, b) => sum + b.price, 0);

return base + extras;

};


const toggleBooster = (booster) => {

setSelectedBoosters(prev =>

prev.find(b => b.id === booster.id)

? prev.filter(b => b.id !== booster.id)

: [...prev, booster]

);

};


const generateOrderId = () => {

const ts = Date.now().toString(36).toUpperCase();

const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();

return `JD-${ts}-${rnd}`;

};


const submitBooking = async () => {

if (!bookingData.name || !bookingData.email || !bookingData.whatsapp) {

showToast('Lengkapi nama, email, dan WhatsApp dulu ya', 'error');

return;

}

if (!selectedService) {

showToast('Pilih layanan utama dulu', 'error');

return;

}

setLoading(true);

const id = generateOrderId();

const total = calculateTotal();

const order = {

id,

...bookingData,

service: selectedService,

boosters: selectedBoosters,

total,

dpAmount: Math.round(total * 0.5),

finalAmount: total - Math.round(total * 0.5),

status: 'pending_payment',

createdAt: Date.now(),

progressLogs: [

{ at: Date.now(), stage: 'pending_payment', note: 'Booking diterima. Menunggu pembayaran DP 50%.' }

],

emailSent: true,

};

try {

await window.storage.set(`order:${id}`, JSON.stringify(order));

setOrderId(id);

setLoading(false);

navigate('payment');

} catch (e) {

setLoading(false);

showToast('Gagal menyimpan booking. Coba lagi ya', 'error');

}

};


const handleTrack = async () => {

if (!trackingId.trim()) {

setTrackError('Masukkan Order ID dulu');

return;

}

setTrackError('');

setLoading(true);

try {

const result = await window.storage.get(`order:${trackingId.trim().toUpperCase()}`);

if (result) {

setTrackedOrder(JSON.parse(result.value));

} else {

setTrackError('Order tidak ditemukan. Cek lagi Order ID-nya ya.');

setTrackedOrder(null);

}

} catch {

setTrackError('Order tidak ditemukan. Cek lagi Order ID-nya ya.');

setTrackedOrder(null);

}

setLoading(false);

};


const submitPaymentProof = async () => {

if (!paymentProof) {

showToast('Upload bukti transfer dulu ya', 'error');

return;

}

setLoading(true);

try {

const result = await window.storage.get(`order:${orderId}`);

if (result) {

const order = JSON.parse(result.value);

order.status = 'dp_verified';

order.dpProof = paymentProof;

order.progressLogs.push({

at: Date.now(),

stage: 'dp_verified',

note: 'Bukti DP diterima dan diverifikasi. Tim sedang setup project & dataset.'

});

setTimeout(async () => {

order.status = 'in_progress';

order.progressLogs.push({

at: Date.now(),

stage: 'in_progress',

note: 'Mulai pengerjaan: data preprocessing & feature engineering.'

});

await window.storage.set(`order:${orderId}`, JSON.stringify(order));

}, 100);

await window.storage.set(`order:${orderId}`, JSON.stringify(order));

setPaymentSubmitted(true);

showToast('Bukti pembayaran berhasil dikirim!', 'success');

}

} catch (e) {

showToast('Gagal upload. Coba lagi', 'error');

}

setLoading(false);

};


const submitFeedback = async () => {

if (!feedbackForm.name || !feedbackForm.message) {

showToast('Mohon isi nama dan pesan testimoninya', 'error');

return;

}

const newT = {

id: 'fb-' + Date.now(),

...feedbackForm,

createdAt: Date.now()

};

try {

await window.storage.set(`testimonial:${newT.id}`, JSON.stringify(newT), true);

setTestimonials(prev => [newT, ...prev]);

setFeedbackSuccess(true);

setFeedbackForm({ name: '', university: '', service: '', rating: 5, message: '' });

showToast('Makasih! Testimoni kamu udah tampil', 'success');

setTimeout(() => setFeedbackSuccess(false), 3000);

} catch (e) {

showToast('Gagal kirim feedback. Coba lagi', 'error');

}

};


const copyOrderId = () => {

if (navigator.clipboard && orderId) {

navigator.clipboard.writeText(orderId);

setCopied(true);

showToast('Order ID tersalin!', 'success');

setTimeout(() => setCopied(false), 2000);

}

};


const onFileSelect = (e) => {

const file = e.target.files[0];

if (file) {

const reader = new FileReader();

reader.onload = () => setPaymentProof({ name: file.name, size: file.size, type: file.type });

reader.readAsDataURL(file);

}

};


// ====== STYLED ATOMS ======


const Toast = () => toast && (

<div className="fixed top-20 right-4 z-[100] animate-slide-in">

<div className={`px-5 py-3 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl ${toast.type === 'success' ? 'bg-emerald-500/95 text-white' : toast.type === 'error' ? 'bg-red-600/95 text-white' : 'bg-slate-900/95 text-white'}`} style={{ borderRadius: '2px' }}>

{toast.type === 'success' ? <Check className="w-5 h-5" strokeWidth={3} /> : toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : null}

<span className="font-semibold text-sm">{toast.msg}</span>

</div>

</div>

);


// ====== NAV ======


const Nav = () => (

<>

<nav className="sticky top-0 z-50 bg-[#0A1628]/90 backdrop-blur-xl border-b border-white/10">

<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

<button onClick={() => navigate('home')} className="flex items-center gap-2.5 group">

<div className="relative">

<div className="w-10 h-10 bg-red-600 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)' }}>

<Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />

</div>

<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white" />

</div>

<div className="text-left">

<div className="font-black text-lg leading-none text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>JAGO DATA</div>

<div className="text-[9px] font-bold tracking-[0.25em] text-red-500">AI · ML · STUDIO</div>

</div>

</button>

<div className="hidden md:flex items-center gap-1">

{[

['home', 'Beranda'],

['services', 'Layanan'],

['booking', 'Booking'],

['track', 'Lacak'],

['testimonials', 'Testimoni'],

].map(([key, label]) => (

<button

key={key}

onClick={() => navigate(key)}

className={`relative px-3.5 py-2 font-semibold text-sm transition-all ${page === key ? 'text-white' : 'text-white/60 hover:text-white'}`}

>

{label}

{page === key && (

<div className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-red-500" />

)}

</button>

))}

</div>

<button onClick={() => navigate('booking')} className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors group">

Mulai Project

<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />

</button>

<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">

{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}

</button>

</div>


{/* Mobile menu */}

{mobileMenuOpen && (

<div className="md:hidden border-t border-white/10 bg-[#0A1628]">

<div className="px-4 py-3 space-y-1">

{[['home', 'Beranda'], ['services', 'Layanan'], ['booking', 'Booking'], ['track', 'Lacak Order'], ['testimonials', 'Testimoni']].map(([k, l]) => (

<button key={k} onClick={() => navigate(k)} className={`w-full text-left px-3 py-2.5 font-semibold ${page === k ? 'text-red-500 border-l-2 border-red-500' : 'text-white/70'}`}>

{l}

</button>

))}

<button onClick={() => navigate('booking')} className="w-full mt-2 px-4 py-3 bg-red-600 text-white font-bold flex items-center justify-center gap-2">

Mulai Project <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

</div>

)}

</nav>

</>

);


// ====== HOME ======


const Home = () => (

<div>

{/* Hero */}

<section className="relative overflow-hidden bg-[#0A1628]">

{/* Decorative grid */}

<div className="absolute inset-0 opacity-[0.07]" style={{

backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,

backgroundSize: '60px 60px'

}} />

{/* Glow orbs */}

<div className="absolute top-1/4 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />

<div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px]" />


<div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32">

<div className="grid lg:grid-cols-12 gap-8 items-center">

<div className="lg:col-span-7">

<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 mb-8">

<div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />

<span className="text-xs font-semibold tracking-wider text-white/80">SEDANG MENERIMA ORDER · MEI 2026</span>

</div>


<h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>

Skripsi AI Mu,<br />

<span className="relative inline-block">

<span className="relative z-10 text-red-500">beres tanpa</span>

<span className="absolute -bottom-2 left-0 right-0 h-3 bg-red-600/30 blur-sm" />

</span>

<br />

<span className="italic font-light text-white/90">begadang.</span>

</h1>


<p className="text-lg lg:text-xl text-white/70 max-w-xl mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>

Tim AI/ML profesional yang bantu eksekusi <span className="text-white font-semibold">project skripsi & riset</span> kamu — dari data mentah sampai model siap pamer di depan penguji.

</p>


<div className="flex flex-wrap gap-3">

<button onClick={() => navigate('booking')} className="group flex items-center gap-2 px-6 py-3.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50">

Mulai Booking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

</button>

<button onClick={() => navigate('services')} className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">

Lihat Layanan

</button>

<button onClick={() => navigate('track')} className="px-6 py-3.5 text-white/70 font-semibold hover:text-white transition-colors flex items-center gap-2">

<Search className="w-4 h-4" /> Lacak order

</button>

</div>


<div className="flex items-center gap-5 mt-12 pt-8 border-t border-white/10 flex-wrap">

<div className="flex -space-x-2">

{['#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map((c, i) => (

<div key={i} className="w-9 h-9 rounded-full border-2 border-[#0A1628] flex items-center justify-center text-white font-black text-xs" style={{ background: c }}>

{['R', 'B', 'S', 'D'][i]}

</div>

))}

</div>

<div>

<div className="flex items-center gap-1 mb-0.5">

{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />)}

<span className="ml-1 font-bold text-white text-sm">4.9/5</span>

</div>

<div className="text-xs text-white/60">500+ mahasiswa udah lulus pakai Jago Data</div>

</div>

</div>

</div>


<div className="lg:col-span-5 relative">

{/* Floating card stack */}

<div className="relative h-[480px] hidden lg:block">

{/* Card 1 — Order status */}

<div className="absolute top-0 right-0 w-80 bg-white p-5 shadow-2xl" style={{ transform: 'rotate(3deg)' }}>

<div className="flex items-center gap-2 mb-3">

<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />

<span className="text-xs font-bold tracking-wider text-slate-600">ORDER JD-X9F-K2L</span>

</div>

<div className="text-sm font-semibold text-slate-900 mb-3">Advanced Forecasting (LSTM)</div>

<div className="space-y-2.5">

{['DP Verified', 'Data Preprocessing', 'Training Model'].map((s, i) => (

<div key={i} className="flex items-center gap-2 text-xs">

<div className={`w-4 h-4 flex items-center justify-center ${i < 2 ? 'bg-emerald-500' : 'bg-red-600'}`}>

{i < 2 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : <Loader2 className="w-3 h-3 text-white animate-spin" />}

</div>

<span className={i < 2 ? 'text-slate-700' : 'text-slate-900 font-bold'}>{s}</span>

</div>

))}

</div>

</div>

{/* Card 2 — Code snippet */}

<div className="absolute top-44 left-0 w-72 bg-[#0F1F3D] text-white p-5 shadow-2xl border border-white/10" style={{ transform: 'rotate(-4deg)' }}>

<div className="flex gap-1.5 mb-3">

<div className="w-2.5 h-2.5 rounded-full bg-red-500" />

<div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />

<div className="w-2.5 h-2.5 rounded-full bg-green-500" />

</div>

<div className="font-mono text-[11px] leading-relaxed">

<div><span className="text-pink-400">from</span> sklearn <span className="text-pink-400">import</span></div>

<div className="pl-2 text-blue-300">RandomForestClassifier</div>

<div className="mt-2"><span className="text-slate-400"># Training model...</span></div>

<div><span className="text-pink-400">model</span> = <span className="text-yellow-300">RandomForest</span>()</div>

<div><span className="text-pink-400">model</span>.fit(X, y)</div>

<div className="mt-2 text-emerald-400">✓ Accuracy: 0.94</div>

</div>

</div>

{/* Card 3 — Rating */}

<div className="absolute bottom-0 right-8 w-64 bg-red-600 text-white p-5 shadow-2xl" style={{ transform: 'rotate(2deg)' }}>

<Quote className="w-6 h-6 mb-2 opacity-50" />

<p className="text-sm font-medium leading-relaxed mb-3">"Sidang lancar dapet A. Worth banget!"</p>

<div className="flex gap-0.5 mb-2">

{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-white text-white" />)}

</div>

<div className="text-xs font-bold">Rara · Brawijaya</div>

</div>

</div>

</div>

</div>


{/* Stats strip */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 lg:mt-24 bg-white/10">

{[

{ n: '500+', l: 'Project selesai', sub: 'Sejak 2023' },

{ n: '4.9/5', l: 'Rating klien', sub: 'Verified' },

{ n: '< 7 hari', l: 'Rata-rata selesai', sub: 'On-time' },

{ n: '50%', l: 'DP doang', sub: 'Risk minimal' },

].map((s, i) => (

<div key={i} className="bg-[#0A1628] p-5 lg:p-6">

<div className="text-3xl lg:text-5xl font-black text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{s.n}</div>

<div className="text-sm font-semibold text-white/80">{s.l}</div>

<div className="text-xs text-white/50 mt-0.5">{s.sub}</div>

</div>

))}

</div>

</div>

</section>


{/* How it works */}

<section className="bg-white py-20 lg:py-28 px-4 sm:px-6">

<div className="max-w-7xl mx-auto">

<div className="flex items-end justify-between mb-16 flex-wrap gap-4">

<div>

<div className="text-xs font-bold tracking-[0.3em] text-red-600 mb-3">/ ALUR KERJA</div>

<h2 className="text-4xl lg:text-6xl font-black text-slate-900 max-w-2xl leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>

4 langkah, <span className="text-red-600">nol drama.</span>

</h2>

</div>

<p className="text-slate-600 max-w-md">

Transparan dari awal. Bayar 50% di depan, lacak progress real-time, lunasi pas hasil siap.

</p>

</div>


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">

{[

{ n: '01', t: 'Diskusi Gratis', d: 'Ngobrol dulu bahas goals project, cek kesiapan data, tentuin layanan yang paling pas.', icon: Headphones },

{ n: '02', t: 'DP 50%', d: 'Transfer DP sebagai tanda jadi via bank atau e-wallet. Order ID langsung terkirim ke email.', icon: CreditCard },

{ n: '03', t: 'Lacak Progres', d: 'Tim Jago Data eksekusi sesuai deadline. Pantau setiap tahap lewat tracking page.', icon: Search },

{ n: '04', t: 'Pelunasan & Kirim', d: 'Hasil akhir (source code, model, dokumentasi) dikirim setelah pelunasan. Aman.', icon: Rocket },

].map((step, i) => {

const Icon = step.icon;

return (

<div key={i} className="bg-white p-7 lg:p-8 group hover:bg-[#0A1628] transition-colors duration-300">

<div className="flex items-start justify-between mb-6">

<div className="text-5xl font-black text-slate-200 group-hover:text-white/20 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>{step.n}</div>

<div className="w-10 h-10 bg-red-600 flex items-center justify-center">

<Icon className="w-5 h-5 text-white" strokeWidth={2.5} />

</div>

</div>

<h3 className="font-black text-xl mb-2 text-slate-900 group-hover:text-white transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>{step.t}</h3>

<p className="text-sm text-slate-600 group-hover:text-white/70 transition-colors leading-relaxed">{step.d}</p>

</div>

);

})}

</div>

</div>

</section>


{/* Featured services */}

<section className="py-20 lg:py-28 px-4 sm:px-6 bg-[#0A1628] text-white relative overflow-hidden">

<div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -translate-x-1/2" />

<div className="relative max-w-7xl mx-auto">

<div className="flex items-end justify-between mb-14 flex-wrap gap-4">

<div>

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-3">/ JAGOAN KAMI</div>

<h2 className="text-4xl lg:text-6xl font-black max-w-3xl leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>

Layanan AI/ML buat <span className="italic font-light">setiap kasus</span>.

</h2>

</div>

<button onClick={() => navigate('services')} className="group flex items-center gap-2 px-5 py-3 bg-white text-[#0A1628] font-bold hover:bg-red-500 hover:text-white transition-all">

Lihat semua harga

<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

</button>

</div>


<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">

{services.slice(0, 6).map((s) => {

const Icon = s.icon;

return (

<button key={s.id} onClick={() => { setSelectedService(s); navigate('booking'); }} className="text-left bg-[#0A1628] p-7 hover:bg-[#0F1F3D] transition-all duration-300 group relative overflow-hidden">

<div className="absolute top-0 right-0 w-20 h-20 bg-red-600/0 group-hover:bg-red-600/10 transition-colors rounded-full blur-2xl" />

<div className="relative">

<div className="w-12 h-12 bg-red-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">

<Icon className="w-6 h-6 text-white" strokeWidth={2} />

</div>

<h3 className="font-black text-xl mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{s.name}</h3>

<p className="text-sm text-white/60 mb-5 leading-relaxed">{s.desc}</p>

<div className="flex flex-wrap gap-1.5 mb-5">

{s.tags.map(tag => (

<span key={tag} className="text-[10px] font-bold tracking-wider px-2 py-0.5 bg-white/10 text-white/70">{tag}</span>

))}

</div>

<div className="flex items-baseline justify-between pt-4 border-t border-white/10">

<div>

<div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Mulai</div>

<div className="font-black text-xl text-red-500" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(s.price)}</div>

</div>

<ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

</div>

</div>

</button>

);

})}

</div>

</div>

</section>


{/* Trust badges */}

<section className="py-16 px-4 sm:px-6 bg-white border-y border-slate-100">

<div className="max-w-7xl mx-auto">

<div className="grid md:grid-cols-3 gap-6">

{[

{ icon: ShieldCheck, t: 'Garansi Revisi Minor', d: 'Free revisi minor maksimal 2x sampai kamu puas dengan hasilnya.' },

{ icon: Award, t: 'Tim Berpengalaman', d: 'Data scientist & ML engineer dengan portofolio 500+ project.' },

{ icon: Headphones, t: 'Support Responsif', d: 'WhatsApp & email aktif. Respon < 1 jam jam kerja.' },

].map((b, i) => {

const Icon = b.icon;

return (

<div key={i} className="flex items-start gap-4 p-6 border border-slate-200 hover:border-red-600 transition-colors">

<div className="w-12 h-12 bg-[#0A1628] flex items-center justify-center flex-shrink-0">

<Icon className="w-6 h-6 text-red-500" strokeWidth={2} />

</div>

<div>

<h3 className="font-black text-lg mb-1 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>{b.t}</h3>

<p className="text-sm text-slate-600 leading-relaxed">{b.d}</p>

</div>

</div>

);

})}

</div>

</div>

</section>


{/* Testimonials preview */}

<section className="py-20 lg:py-28 px-4 sm:px-6 bg-white">

<div className="max-w-7xl mx-auto">

<div className="flex items-end justify-between mb-14 flex-wrap gap-4">

<div>

<div className="text-xs font-bold tracking-[0.3em] text-red-600 mb-3">/ TESTIMONI</div>

<h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>

Yang udah <span className="text-red-600">sidang.</span>

</h2>

</div>

<button onClick={() => navigate('testimonials')} className="group flex items-center gap-2 px-5 py-3 bg-[#0A1628] text-white font-bold hover:bg-red-600 transition-colors">

Lihat semua

<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

</button>

</div>

<div className="grid md:grid-cols-3 gap-6">

{testimonials.slice(0, 3).map((t, i) => (

<div key={t.id} className={`relative p-7 ${i === 1 ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}>

<Quote className={`w-8 h-8 mb-4 ${i === 1 ? 'text-white/40' : 'text-red-600/40'}`} strokeWidth={2} />

<div className="flex gap-0.5 mb-4">

{Array.from({ length: t.rating }).map((_, j) => (

<Star key={j} className={`w-4 h-4 fill-current ${i === 1 ? 'text-white' : 'text-red-600'}`} />

))}

</div>

<p className="font-medium leading-relaxed mb-5">"{t.message}"</p>

<div className={`border-t pt-4 ${i === 1 ? 'border-white/20' : 'border-slate-200'}`}>

<div className="font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{t.name}</div>

<div className={`text-xs ${i === 1 ? 'text-white/70' : 'text-slate-500'}`}>{t.university} · {t.service}</div>

</div>

</div>

))}

</div>

</div>

</section>


{/* CTA */}

<section className="py-20 lg:py-28 px-4 sm:px-6 bg-[#0A1628] relative overflow-hidden">

<div className="absolute inset-0 opacity-[0.07]" style={{

backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,

backgroundSize: '60px 60px'

}} />

<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/15 rounded-full blur-[120px]" />

<div className="relative max-w-4xl mx-auto text-center">

<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 mb-8">

<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

<span className="text-xs font-semibold tracking-wider text-white/80">DEADLINE MEPET? KAMI BISA</span>

</div>

<h2 className="text-4xl lg:text-7xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>

Siap pamer di depan <br />

<span className="text-red-500 italic font-light">penguji?</span>

</h2>

<p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Konsultasi awal gratis. Nggak ada biaya tersembunyi. Revisi minor sampai puas.</p>

<div className="flex flex-wrap gap-3 justify-center">

<button onClick={() => navigate('booking')} className="group px-7 py-4 bg-red-600 text-white font-bold inline-flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-600/40">

Booking Sekarang <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />

</button>

<button onClick={() => navigate('services')} className="px-7 py-4 bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">

Lihat Layanan Dulu

</button>

</div>

</div>

</section>

</div>

);


// ====== SERVICES ======


const Services = () => (

<div className="bg-white min-h-screen">

<section className="bg-[#0A1628] text-white py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden">

<div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />

<div className="relative max-w-7xl mx-auto">

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-4">/ PRICE LIST LENGKAP</div>

<h1 className="text-5xl lg:text-8xl font-black mb-6 leading-[0.95]" style={{ fontFamily: 'Syne, sans-serif' }}>

Harga pas. <br />

<span className="italic font-light text-white/80">Tanpa hidden fee.</span>

</h1>

<p className="text-lg max-w-2xl text-white/70">Pilih layanan utama, tambahin booster sesuai kebutuhan. Bayar 50% di depan, sisanya pas hasil siap kirim.</p>

</div>

</section>


<section className="py-16 lg:py-20 px-4 sm:px-6">

<div className="max-w-7xl mx-auto">

<div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">

<h2 className="text-3xl lg:text-4xl font-black text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Main Services</h2>

<span className="text-sm text-slate-500">{services.length} layanan tersedia</span>

</div>


<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">

{services.map((s) => {

const Icon = s.icon;

return (

<div key={s.id} className="bg-white p-7 flex flex-col hover:bg-slate-50 transition-colors group">

<div className="w-12 h-12 bg-[#0A1628] group-hover:bg-red-600 transition-colors flex items-center justify-center mb-5">

<Icon className="w-6 h-6 text-white" strokeWidth={2} />

</div>

<h3 className="font-black text-xl mb-2 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>{s.name}</h3>

<p className="text-sm text-slate-600 mb-5 leading-relaxed flex-1">{s.desc}</p>

<div className="flex flex-wrap gap-1.5 mb-5">

{s.tags.map(tag => (

<span key={tag} className="text-[10px] font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600">{tag}</span>

))}

</div>

<div className="flex items-baseline justify-between mb-5 pt-4 border-t border-slate-200">

<div>

<div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mulai</div>

<div className="font-black text-2xl text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(s.price)}</div>

</div>

</div>

<button onClick={() => { setSelectedService(s); setBookingStep(1); navigate('booking'); }} className="w-full py-3 bg-[#0A1628] text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">

Pilih Layanan <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

);

})}

</div>

</div>

</section>


<section className="py-16 lg:py-20 px-4 sm:px-6 bg-slate-50">

<div className="max-w-7xl mx-auto">

<h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Jago Data Boosters</h2>

<p className="text-slate-600 mb-8">Layanan tambahan biar project kamu lebih lengkap.</p>

<div className="grid md:grid-cols-3 gap-6">

{boosters.map((b) => (

<div key={b.id} className="bg-white border-l-4 border-red-600 p-7 hover:shadow-lg transition-shadow">

<h3 className="font-black text-lg mb-2 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>{b.name}</h3>

<p className="text-sm text-slate-600 mb-5 leading-relaxed">{b.desc}</p>

<div className="font-black text-2xl text-red-600 pt-4 border-t border-slate-200" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(b.price)}</div>

</div>

))}

</div>


<div className="mt-8 bg-[#0A1628] text-white p-7 flex items-start gap-4">

<div className="w-12 h-12 bg-red-600 flex items-center justify-center flex-shrink-0">

<ShieldCheck className="w-6 h-6 text-white" strokeWidth={2} />

</div>

<div>

<div className="font-black text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Garansi Revisi</div>

<p className="text-white/80 text-sm">Revisi minor <strong className="text-red-500">GRATIS</strong> maksimal 2 kali. Konsultasi awal selalu free.</p>

</div>

</div>

</div>

</section>

</div>

);


// ====== BOOKING ======


const Booking = () => (

<div className="bg-white min-h-screen">

<section className="bg-[#0A1628] text-white py-12 lg:py-16 px-4 sm:px-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-[100px]" />

<div className="relative max-w-6xl mx-auto">

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-3">/ FORM BOOKING</div>

<h1 className="text-4xl lg:text-6xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Mari mulai.</h1>

<p className="text-white/70 max-w-xl">Setelah submit, Order ID langsung terkirim ke email dengan instruksi pembayaran DP.</p>


{/* Progress steps */}

<div className="mt-10 flex items-center gap-2 flex-wrap">

{['Pilih Layanan', 'Data Diri', 'Review'].map((label, i) => {

const stepNum = i + 1;

const active = bookingStep === stepNum;

const done = bookingStep > stepNum;

return (

<React.Fragment key={i}>

<div className={`flex items-center gap-2 px-3 py-1.5 ${active ? 'bg-red-600' : done ? 'bg-white/10' : 'bg-white/5'}`}>

<div className={`w-5 h-5 flex items-center justify-center text-xs font-black ${active ? 'bg-white text-red-600' : done ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white/60'}`}>

{done ? <Check className="w-3 h-3" strokeWidth={3} /> : stepNum}

</div>

<span className={`text-xs font-bold ${active ? 'text-white' : done ? 'text-white/80' : 'text-white/40'}`}>{label}</span>

</div>

{i < 2 && <div className={`w-6 h-px ${done ? 'bg-emerald-500' : 'bg-white/20'}`} />}

</React.Fragment>

);

})}

</div>

</div>

</section>


<section className="py-12 px-4 sm:px-6">

<div className="max-w-6xl mx-auto">

<div className="grid lg:grid-cols-3 gap-8">

<div className="lg:col-span-2 space-y-6">

{/* Step 1: Service */}

<div className={`bg-white border-2 ${bookingStep === 1 ? 'border-[#0A1628]' : 'border-slate-200'} p-6 lg:p-7`}>

<div className="flex items-center justify-between mb-5">

<div>

<div className="text-xs font-bold tracking-wider text-red-600 mb-1">STEP 01</div>

<h2 className="font-black text-2xl text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Pilih Layanan Utama</h2>

</div>

{selectedService && bookingStep > 1 && (

<button onClick={() => setBookingStep(1)} className="text-xs font-bold text-red-600 hover:underline">Edit</button>

)}

</div>


{bookingStep === 1 ? (

<>

<div className="grid sm:grid-cols-2 gap-3">

{services.map((s) => {

const active = selectedService?.id === s.id;

const Icon = s.icon;

return (

<button key={s.id} onClick={() => setSelectedService(s)} className={`text-left p-4 border-2 transition-all ${active ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-slate-400'}`}>

<div className="flex items-start gap-3">

<div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${active ? 'bg-red-600' : 'bg-slate-100'}`}>

<Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-600'}`} strokeWidth={2} />

</div>

<div className="flex-1 min-w-0">

<div className="font-black text-sm mb-1 text-slate-900">{s.name}</div>

<div className="font-bold text-sm text-red-600">{formatRupiah(s.price)}</div>

</div>

{active && <Check className="w-5 h-5 text-red-600" strokeWidth={3} />}

</div>

</button>

);

})}

</div>

{selectedService && (

<div className="mt-5 flex justify-end">

<button onClick={() => setBookingStep(2)} className="px-6 py-3 bg-[#0A1628] text-white font-bold hover:bg-red-600 transition-colors flex items-center gap-2">

Lanjut <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

)}

</>

) : selectedService && (

<div className="flex items-center gap-3 p-3 bg-slate-50">

<div className="w-10 h-10 bg-red-600 flex items-center justify-center">

<selectedService.icon className="w-5 h-5 text-white" strokeWidth={2} />

</div>

<div className="flex-1">

<div className="font-bold text-sm text-slate-900">{selectedService.name}</div>

<div className="text-xs text-slate-500">{formatRupiah(selectedService.price)}</div>

</div>

</div>

)}

</div>


{/* Boosters (always visible after step 1) */}

{bookingStep >= 1 && selectedService && (

<div className="bg-white border-2 border-slate-200 p-6 lg:p-7">

<div className="mb-5">

<div className="text-xs font-bold tracking-wider text-red-600 mb-1">OPSIONAL</div>

<h2 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Tambah Booster</h2>

</div>

<div className="space-y-3">

{boosters.map((b) => {

const active = selectedBoosters.find(x => x.id === b.id);

return (

<button key={b.id} onClick={() => toggleBooster(b)} className={`w-full text-left p-4 border-2 flex items-start gap-3 transition-all ${active ? 'border-red-600 bg-red-50' : 'border-slate-200 hover:border-slate-400'}`}>

<div className={`w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${active ? 'border-red-600 bg-red-600' : 'border-slate-300 bg-white'}`}>

{active && <Check className="w-4 h-4 text-white" strokeWidth={3} />}

</div>

<div className="flex-1">

<div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">

<div className="font-black text-sm text-slate-900">{b.name}</div>

<div className="font-black text-sm text-red-600">+ {formatRupiah(b.price)}</div>

</div>

<div className="text-xs text-slate-600">{b.desc}</div>

</div>

</button>

);

})}

</div>

</div>

)}


{/* Step 2: Personal info */}

{bookingStep >= 2 && (

<div className={`bg-white border-2 ${bookingStep === 2 ? 'border-[#0A1628]' : 'border-slate-200'} p-6 lg:p-7`}>

<div className="flex items-center justify-between mb-5">

<div>

<div className="text-xs font-bold tracking-wider text-red-600 mb-1">STEP 02</div>

<h2 className="font-black text-2xl text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Data Diri & Project</h2>

</div>

</div>

<div className="space-y-4">

<div className="grid sm:grid-cols-2 gap-4">

{[

{ k: 'name', l: 'Nama Lengkap', p: 'Budi Setiawan', icon: User, required: true },

{ k: 'email', l: 'Email Aktif', p: 'budi@email.com', icon: Mail, type: 'email', required: true },

{ k: 'whatsapp', l: 'WhatsApp', p: '08123456789', icon: MessageSquare, required: true },

{ k: 'university', l: 'Universitas', p: 'Universitas Indonesia', icon: Database },

].map(({ k, l, p, icon: Icon, type, required }) => (

<div key={k}>

<label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">

{l} {required && <span className="text-red-600">*</span>}

</label>

<div className="flex items-center border-2 border-slate-200 bg-white focus-within:border-red-600 transition-all">

<div className="px-3 py-3 border-r border-slate-200 bg-slate-50">

<Icon className="w-4 h-4 text-slate-600" strokeWidth={2} />

</div>

<input

type={type || 'text'}

value={bookingData[k]}

onChange={(e) => setBookingData({ ...bookingData, [k]: e.target.value })}

placeholder={p}

className="flex-1 px-3 py-3 font-medium focus:outline-none bg-transparent text-slate-900 text-sm w-full min-w-0"

/>

</div>

</div>

))}

</div>

<div>

<label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">Target Deadline</label>

<div className="flex items-center border-2 border-slate-200 bg-white focus-within:border-red-600 transition-all">

<div className="px-3 py-3 border-r border-slate-200 bg-slate-50">

<Clock className="w-4 h-4 text-slate-600" strokeWidth={2} />

</div>

<input

type="date"

value={bookingData.deadline}

onChange={(e) => setBookingData({ ...bookingData, deadline: e.target.value })}

className="flex-1 px-3 py-3 font-medium focus:outline-none bg-transparent text-slate-900 text-sm"

/>

</div>

</div>

<div>

<label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">Deskripsi Project</label>

<textarea

value={bookingData.description}

onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}

placeholder="Cerita singkat: topik skripsi, dataset, ekspektasi output..."

rows={4}

className="w-full px-3 py-3 border-2 border-slate-200 font-medium focus:outline-none focus:border-red-600 transition-all text-sm"

/>

</div>

</div>

<div className="mt-6 flex gap-3 justify-end flex-wrap">

<button onClick={() => setBookingStep(1)} className="px-5 py-3 border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors">

Kembali

</button>

<button onClick={submitBooking} disabled={loading} className="px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/30">

{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Booking <ArrowRight className="w-4 h-4" strokeWidth={2.5} /></>}

</button>

</div>

</div>

)}

</div>


{/* Summary sidebar */}

<div className="lg:col-span-1">

<div className="lg:sticky lg:top-24 bg-[#0A1628] text-white p-6 lg:p-7 relative overflow-hidden">

<div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl" />

<div className="relative">

<div className="text-xs font-bold tracking-[0.25em] text-red-500 mb-4">/ RINGKASAN ORDER</div>

{selectedService ? (

<>

<div className="space-y-3 mb-5">

<div className="flex justify-between text-sm pb-3 border-b border-white/10">

<div className="font-medium pr-2">{selectedService.name}</div>

<div className="font-bold whitespace-nowrap">{formatRupiah(selectedService.price)}</div>

</div>

{selectedBoosters.map(b => (

<div key={b.id} className="flex justify-between text-sm pb-3 border-b border-white/10 text-white/70">

<div className="font-medium pr-2">+ {b.name}</div>

<div className="font-bold whitespace-nowrap">{formatRupiah(b.price)}</div>

</div>

))}

</div>

<div className="bg-red-600 p-5 mb-5">

<div className="text-xs font-bold tracking-wider opacity-90 mb-1">TOTAL</div>

<div className="font-black text-3xl mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(calculateTotal())}</div>

<div className="bg-white/10 p-2.5 text-xs">

<div className="flex justify-between">

<span className="opacity-90">DP 50% (di awal)</span>

<span className="font-bold">{formatRupiah(Math.round(calculateTotal() * 0.5))}</span>

</div>

<div className="flex justify-between mt-1">

<span className="opacity-90">Pelunasan</span>

<span className="font-bold">{formatRupiah(calculateTotal() - Math.round(calculateTotal() * 0.5))}</span>

</div>

</div>

</div>

<div className="space-y-2 text-xs text-white/60">

<div className="flex items-center gap-2">

<Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} /> Konsultasi awal gratis

</div>

<div className="flex items-center gap-2">

<Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} /> Revisi minor 2x free

</div>

<div className="flex items-center gap-2">

<Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} /> Source code + dokumentasi

</div>

</div>

</>

) : (

<div className="py-8 text-center text-white/50 text-sm">

<Package className="w-10 h-10 mx-auto mb-3 opacity-30" strokeWidth={1.5} />

Pilih layanan utama untuk lihat ringkasan.

</div>

)}

</div>

</div>

</div>

</div>

</div>

</section>

</div>

);


// ====== PAYMENT ======


const Payment = () => {

const [order, setOrder] = useState(null);

useEffect(() => {

if (orderId) {

window.storage.get(`order:${orderId}`).then(r => r && setOrder(JSON.parse(r.value))).catch(() => {});

}

}, []);


if (!order) return (

<div className="bg-white min-h-screen flex items-center justify-center">

<Loader2 className="w-8 h-8 animate-spin text-red-600" />

</div>

);


return (

<div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6">

<div className="max-w-3xl mx-auto">

{/* Success banner */}

<div className="bg-[#0A1628] text-white p-6 lg:p-8 mb-6 flex items-start gap-4 relative overflow-hidden">

<div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

<div className="relative w-14 h-14 bg-emerald-500 flex items-center justify-center flex-shrink-0">

<Check className="w-8 h-8 text-white" strokeWidth={3} />

</div>

<div className="relative flex-1">

<div className="text-xs font-bold tracking-[0.25em] text-emerald-400 mb-2">/ BOOKING BERHASIL</div>

<h1 className="text-2xl lg:text-3xl font-black mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Email konfirmasi terkirim</h1>

<p className="text-white/80 text-sm">Cek inbox <strong className="text-white">{order.email}</strong> untuk detail order lengkap. Simpan Order ID di bawah untuk tracking.</p>

</div>

</div>


{/* Order ID */}

<div className="bg-white border-2 border-slate-200 p-6 mb-6">

<div className="text-xs font-bold tracking-wider text-slate-500 mb-2">ORDER ID KAMU</div>

<div className="flex items-center gap-3 flex-wrap">

<div className="font-black text-2xl lg:text-3xl tracking-wider text-red-600" style={{ fontFamily: 'Syne, sans-serif' }}>{order.id}</div>

<button onClick={copyOrderId} className="px-4 py-2 border-2 border-slate-200 font-bold text-sm flex items-center gap-2 hover:bg-[#0A1628] hover:text-white hover:border-[#0A1628] transition-all">

{copied ? <><Check className="w-4 h-4" strokeWidth={3} /> Tersalin</> : <><Copy className="w-4 h-4" /> Salin</>}

</button>

</div>

</div>


{/* Payment */}

<div className="bg-white border-2 border-slate-200 p-6 lg:p-8 mb-6">

<h2 className="font-black text-2xl mb-1 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Pembayaran DP 50%</h2>

<p className="text-sm text-slate-600 mb-6">Transfer ke salah satu rekening di bawah lalu upload bukti pembayaran.</p>


<div className="bg-gradient-to-br from-[#0A1628] to-[#0F1F3D] text-white p-6 mb-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />

<div className="relative">

<div className="text-xs font-bold tracking-wider opacity-70 mb-1">JUMLAH YANG HARUS DIBAYAR</div>

<div className="text-4xl lg:text-5xl font-black text-red-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(order.dpAmount)}</div>

<div className="text-sm text-white/70">Sisa pelunasan: {formatRupiah(order.finalAmount)} (saat hasil siap)</div>

</div>

</div>


<div className="grid sm:grid-cols-2 gap-3 mb-6">

<div className="border-2 border-slate-200 p-4 hover:border-red-600 transition-colors">

<div className="flex items-center justify-between mb-3">

<div className="font-black text-lg text-[#0A1628]">BCA</div>

<div className="w-8 h-5 bg-blue-600" />

</div>

<div className="font-black text-xl text-slate-900 tracking-wide">1234567890</div>

<div className="text-xs text-slate-600 mt-1">a/n Jago Data Studio</div>

</div>

<div className="border-2 border-slate-200 p-4 hover:border-red-600 transition-colors">

<div className="flex items-center justify-between mb-3">

<div className="font-black text-lg text-[#0A1628]">E-Wallet</div>

<div className="flex gap-1">

<div className="px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-black">DANA</div>

<div className="px-1.5 py-0.5 bg-purple-600 text-white text-[8px] font-black">OVO</div>

</div>

</div>

<div className="font-black text-xl text-slate-900 tracking-wide">081234567890</div>

<div className="text-xs text-slate-600 mt-1">a/n Jago Data</div>

</div>

</div>


{!paymentSubmitted ? (

<>

<div className="mb-4">

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">Upload Bukti Transfer</label>

<label className="block w-full border-2 border-dashed border-slate-300 p-8 text-center cursor-pointer hover:border-red-600 hover:bg-red-50/30 transition-all">

<input type="file" accept="image/*,application/pdf" onChange={onFileSelect} className="hidden" />

<Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" strokeWidth={1.5} />

{paymentProof ? (

<div>

<div className="font-bold text-slate-900">{paymentProof.name}</div>

<div className="text-xs text-slate-500 mt-1">Klik untuk ganti file</div>

</div>

) : (

<>

<div className="font-bold text-slate-700">Klik untuk pilih file</div>

<div className="text-xs text-slate-500 mt-1">JPG, PNG, atau PDF · Max 5MB</div>

</>

)}

</label>

</div>

<button onClick={submitPaymentProof} disabled={loading || !paymentProof} className="w-full py-4 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">

{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Kirim Bukti Pembayaran <ArrowRight className="w-4 h-4" strokeWidth={2.5} /></>}

</button>

</>

) : (

<div className="bg-emerald-50 border-2 border-emerald-500 p-5">

<div className="flex items-center gap-3 mb-2">

<div className="w-8 h-8 bg-emerald-500 flex items-center justify-center">

<Check className="w-5 h-5 text-white" strokeWidth={3} />

</div>

<div className="font-black text-lg text-emerald-900" style={{ fontFamily: 'Syne, sans-serif' }}>Bukti diterima!</div>

</div>

<p className="text-sm text-emerald-800 mb-4">Tim Jago Data akan verifikasi dalam 1-2 jam. Status order kamu akan update otomatis. Pantau di halaman Lacak Order.</p>

<button onClick={() => { setTrackingId(order.id); navigate('track'); handleTrack(); }} className="px-5 py-2.5 bg-[#0A1628] text-white font-bold inline-flex items-center gap-2 hover:bg-red-600 transition-colors">

Ke Lacak Order <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

)}

</div>

</div>

</div>

);

};


// ====== TRACK ======


const Track = () => {

const currentStageIndex = trackedOrder ? stages.findIndex(s => s.key === trackedOrder.status) : -1;


const advanceStage = async (newStatus, note) => {

if (!trackedOrder) return;

const updated = { ...trackedOrder, status: newStatus };

updated.progressLogs = [...updated.progressLogs, { at: Date.now(), stage: newStatus, note }];

await window.storage.set(`order:${trackedOrder.id}`, JSON.stringify(updated));

setTrackedOrder(updated);

showToast('Status order diperbarui', 'success');

};


return (

<div className="bg-white min-h-screen">

<section className="bg-[#0A1628] text-white py-12 lg:py-16 px-4 sm:px-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-[100px]" />

<div className="relative max-w-4xl mx-auto">

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-3">/ LACAK ORDER</div>

<h1 className="text-4xl lg:text-6xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Real-time progress.</h1>

<p className="text-white/70 max-w-xl">Masukkan Order ID kamu untuk lihat status pengerjaan, log aktivitas, dan tahapan selanjutnya.</p>

</div>

</section>


<section className="py-12 px-4 sm:px-6">

<div className="max-w-4xl mx-auto">

{/* Search */}

<div className="bg-white border-2 border-slate-200 p-6 mb-6">

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700">Order ID</label>

<div className="flex gap-2 flex-wrap sm:flex-nowrap">

<div className="flex-1 flex items-center border-2 border-slate-200 focus-within:border-red-600 transition-all w-full">

<div className="px-3 py-3 border-r border-slate-200 bg-slate-50">

<Search className="w-4 h-4 text-slate-600" strokeWidth={2} />

</div>

<input

type="text"

value={trackingId}

onChange={(e) => setTrackingId(e.target.value)}

onKeyDown={(e) => e.key === 'Enter' && handleTrack()}

placeholder="JD-XXXX-XXXX"

className="flex-1 px-3 py-3 font-mono font-bold focus:outline-none text-slate-900 min-w-0"

/>

</div>

<button onClick={handleTrack} disabled={loading} className="px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50">

{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Lacak <ArrowRight className="w-4 h-4" strokeWidth={2.5} /></>}

</button>

</div>

{trackError && (

<div className="mt-3 flex items-center gap-2 text-red-600 font-bold text-sm">

<AlertCircle className="w-4 h-4" /> {trackError}

</div>

)}

</div>


{trackedOrder && (

<>

{/* Order header */}

<div className="bg-[#0A1628] text-white p-6 lg:p-7 mb-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />

<div className="relative">

<div className="flex justify-between items-start mb-5 flex-wrap gap-3">

<div>

<div className="text-xs font-bold tracking-[0.25em] text-red-500 mb-1">/ ORDER</div>

<div className="font-black text-2xl lg:text-3xl" style={{ fontFamily: 'Syne, sans-serif' }}>{trackedOrder.id}</div>

</div>

<div className="text-right">

<div className="text-xs font-bold tracking-wider opacity-70 mb-1">TOTAL</div>

<div className="font-black text-2xl lg:text-3xl text-red-500" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(trackedOrder.total)}</div>

</div>

</div>

<div className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm border-t border-white/10 pt-4">

<div><span className="text-white/50">Klien:</span> <span className="font-bold">{trackedOrder.name}</span></div>

<div><span className="text-white/50">Layanan:</span> <span className="font-bold">{trackedOrder.service.name}</span></div>

{trackedOrder.boosters.length > 0 && (

<div className="sm:col-span-2"><span className="text-white/50">Booster:</span> <span className="font-bold">{trackedOrder.boosters.map(b => b.name).join(', ')}</span></div>

)}

{trackedOrder.deadline && <div><span className="text-white/50">Deadline:</span> <span className="font-bold">{trackedOrder.deadline}</span></div>}

</div>

</div>

</div>


{/* Progress percentage */}

<div className="bg-white border-2 border-slate-200 p-6 mb-6">

<div className="flex items-center justify-between mb-3 flex-wrap gap-2">

<div>

<h2 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Progress Project</h2>

<div className="text-xs text-slate-500 mt-1">Status saat ini: <span className="font-bold text-red-600">{stages[currentStageIndex]?.label}</span></div>

</div>

<div className="text-4xl font-black text-red-600" style={{ fontFamily: 'Syne, sans-serif' }}>

{Math.round(((currentStageIndex + 1) / stages.length) * 100)}%

</div>

</div>

<div className="h-3 bg-slate-100 overflow-hidden">

<div className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-700" style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }} />

</div>

</div>


{/* Stages timeline */}

<div className="bg-white border-2 border-slate-200 p-6 lg:p-8 mb-6">

<h2 className="font-black text-xl mb-6 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Tahapan</h2>

<div className="space-y-0">

{stages.map((stage, idx) => {

const done = idx < currentStageIndex;

const active = idx === currentStageIndex;

const Icon = stage.icon;

return (

<div key={stage.key} className="flex gap-4">

<div className="flex flex-col items-center">

<div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-emerald-500 text-white' : active ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>

<Icon className={`w-5 h-5 ${active && stage.key === 'in_progress' ? 'animate-spin' : ''}`} strokeWidth={2.5} />

</div>

{idx < stages.length - 1 && (

<div className={`w-0.5 flex-1 min-h-[48px] ${done ? 'bg-emerald-500' : 'bg-slate-200'}`} />

)}

</div>

<div className={`flex-1 pb-8 ${done || active ? '' : 'opacity-40'}`}>

<div className="font-black text-slate-900 text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{stage.label}</div>

{active && (

<div className="text-sm text-red-600 font-bold mt-1 flex items-center gap-1.5">

<div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" /> Tahap saat ini

</div>

)}

{done && (

<div className="text-sm text-emerald-600 font-bold mt-1 flex items-center gap-1">

<Check className="w-3.5 h-3.5" strokeWidth={3} /> Selesai

</div>

)}

</div>

</div>

);

})}

</div>

</div>


{/* Logs */}

<div className="bg-white border-2 border-slate-200 p-6 lg:p-8 mb-6">

<h2 className="font-black text-xl mb-5 text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Log Aktivitas</h2>

<div className="space-y-4">

{[...trackedOrder.progressLogs].reverse().map((log, i) => (

<div key={i} className="flex gap-3">

<div className="w-2 h-2 bg-red-600 mt-1.5 flex-shrink-0" />

<div className="flex-1">

<div className="text-xs font-bold text-slate-500 uppercase tracking-wider">

{new Date(log.at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}

</div>

<div className="text-sm text-slate-800 mt-0.5">{log.note}</div>

</div>

</div>

))}

</div>

</div>


{/* Action: Final payment */}

{trackedOrder.status === 'ready_final' && (

<div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

<div className="relative">

<div className="text-xs font-bold tracking-[0.25em] text-white/80 mb-2">/ SIAP PELUNASAN</div>

<h2 className="font-black text-2xl mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>🎉 Project kamu siap!</h2>

<p className="text-white/90 mb-5 text-sm">Tim Jago Data udah selesain projectmu. Lunasi sisa pembayaran untuk dapetin source code & hasil akhir.</p>

<div className="bg-white/10 backdrop-blur p-4 mb-5">

<div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Sisa Pelunasan</div>

<div className="text-3xl font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(trackedOrder.finalAmount)}</div>

</div>

<button onClick={() => advanceStage('final_paid', 'Pelunasan diterima. Menyiapkan file untuk pengiriman.')} className="px-6 py-3 bg-white text-red-600 font-bold hover:bg-[#0A1628] hover:text-white transition-colors flex items-center gap-2">

Konfirmasi Pelunasan <ArrowRight className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

</div>

)}


{trackedOrder.status === 'delivered' && (

<div className="bg-[#0A1628] text-white p-6 lg:p-8 mb-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl" />

<div className="relative">

<div className="text-xs font-bold tracking-[0.25em] text-emerald-400 mb-2">/ PROJECT TERKIRIM</div>

<h2 className="font-black text-2xl mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>🚀 Selesai!</h2>

<p className="text-white/80 mb-5 text-sm">Hasil akhir udah dikirim ke email <strong className="text-white">{trackedOrder.email}</strong>. Cek folder Inbox & Spam. Semoga sidangnya lancar! 🎓</p>

<button onClick={() => navigate('testimonials')} className="px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-2">

Kasih Testimoni <ThumbsUp className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

</div>

)}


{/* Demo controls */}

<div className="bg-slate-50 border border-dashed border-slate-300 p-4 text-xs">

<div className="font-bold mb-2 uppercase tracking-wider text-slate-600">🔧 Demo Mode — Simulasi update admin</div>

<div className="flex flex-wrap gap-2">

{trackedOrder.status === 'in_progress' && (

<button onClick={() => advanceStage('ready_final', 'Project selesai dikerjakan. Menunggu pelunasan dari klien.')} className="px-3 py-1.5 border border-slate-300 bg-white font-bold hover:bg-[#0A1628] hover:text-white hover:border-[#0A1628] transition-colors">→ Tandai Siap Pelunasan</button>

)}

{trackedOrder.status === 'final_paid' && (

<button onClick={() => advanceStage('delivered', 'Source code, model, dan dokumentasi dikirim ke email klien.')} className="px-3 py-1.5 border border-slate-300 bg-white font-bold hover:bg-[#0A1628] hover:text-white hover:border-[#0A1628] transition-colors">→ Kirim Hasil</button>

)}

</div>

</div>

</>

)}

</div>

</section>

</div>

);

};


// ====== TESTIMONIALS ======


const Testimonials = () => (

<div className="bg-white min-h-screen">

<section className="bg-[#0A1628] text-white py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">

<div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />

<div className="relative max-w-7xl mx-auto">

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-4">/ TESTIMONI</div>

<h1 className="text-5xl lg:text-7xl font-black mb-4 leading-[0.95]" style={{ fontFamily: 'Syne, sans-serif' }}>

Cerita dari yang <br />

<span className="italic font-light text-white/80">udah sidang.</span>

</h1>

<p className="text-lg text-white/70 max-w-2xl">Apa kata mereka yang udah lulus pake Jago Data. {testimonials.length} testimoni terverifikasi.</p>

</div>

</section>


<section className="py-12 lg:py-16 px-4 sm:px-6">

<div className="max-w-7xl mx-auto">

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

{testimonials.map((t, i) => {

const variants = [

'bg-white border border-slate-200',

'bg-[#0A1628] text-white',

'bg-red-600 text-white',

'bg-white border border-slate-200',

'bg-slate-50 border border-slate-200',

'bg-[#0A1628] text-white',

];

const variant = variants[i % variants.length];

const isDark = variant.includes('0A1628') || variant.includes('red-600');

return (

<div key={t.id} className={`p-7 ${variant} relative flex flex-col`}>

<Quote className={`w-8 h-8 mb-4 ${isDark ? 'text-white/40' : 'text-red-600/40'}`} strokeWidth={2} />

<div className="flex gap-0.5 mb-4">

{Array.from({ length: t.rating }).map((_, j) => (

<Star key={j} className={`w-4 h-4 fill-current ${variant.includes('red-600') ? 'text-white' : 'text-red-600'}`} />

))}

</div>

<p className="font-medium leading-relaxed mb-5 flex-1">"{t.message}"</p>

<div className={`border-t pt-4 ${isDark ? 'border-white/20' : 'border-slate-200'}`}>

<div className="font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{t.name}</div>

<div className={`text-xs ${isDark ? 'text-white/70' : 'text-slate-500'}`}>{t.university}</div>

{t.service && <div className={`text-xs font-bold mt-1 ${isDark ? 'text-red-300' : 'text-red-600'}`}>{t.service}</div>}

</div>

</div>

);

})}

</div>


{/* Submit form */}

<div className="bg-[#0A1628] text-white p-8 lg:p-10 relative overflow-hidden">

<div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[100px]" />

<div className="relative">

<div className="text-xs font-bold tracking-[0.3em] text-red-500 mb-3">/ KIRIM TESTIMONI</div>

<h2 className="text-3xl lg:text-4xl font-black mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>

Udah pake Jago Data? <span className="italic font-light">Share dong!</span>

</h2>

<p className="text-white/70 mb-8">Ceritanya bantu mahasiswa lain milih layanan yang pas. Semua testimoni langsung tampil di sini.</p>


{feedbackSuccess && (

<div className="bg-emerald-500 p-4 mb-6 flex items-center gap-3 font-bold">

<Check className="w-5 h-5" strokeWidth={3} /> Makasih! Testimoni kamu udah tampil 🎉

</div>

)}


<div className="grid sm:grid-cols-2 gap-4 mb-4">

<div>

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/70">Nama</label>

<input

type="text"

value={feedbackForm.name}

onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}

placeholder="Nama atau inisial"

className="w-full px-3 py-3 border-2 border-white/20 bg-white/5 text-white font-medium focus:outline-none focus:border-red-500 transition-colors placeholder:text-white/30"

/>

</div>

<div>

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/70">Universitas</label>

<input

type="text"

value={feedbackForm.university}

onChange={(e) => setFeedbackForm({ ...feedbackForm, university: e.target.value })}

placeholder="Univ kamu"

className="w-full px-3 py-3 border-2 border-white/20 bg-white/5 text-white font-medium focus:outline-none focus:border-red-500 transition-colors placeholder:text-white/30"

/>

</div>

</div>


<div className="mb-4">

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/70">Layanan yang dipake</label>

<select

value={feedbackForm.service}

onChange={(e) => setFeedbackForm({ ...feedbackForm, service: e.target.value })}

className="w-full px-3 py-3 border-2 border-white/20 bg-white/5 text-white font-medium focus:outline-none focus:border-red-500 transition-colors"

>

<option value="" className="text-slate-900">Pilih layanan...</option>

{services.map(s => <option key={s.id} value={s.name} className="text-slate-900">{s.name}</option>)}

</select>

</div>


<div className="mb-4">

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/70">Rating</label>

<div className="flex gap-2">

{[1, 2, 3, 4, 5].map(r => (

<button key={r} onClick={() => setFeedbackForm({ ...feedbackForm, rating: r })} className="transition-transform hover:scale-110">

<Star className={`w-9 h-9 ${r <= feedbackForm.rating ? 'fill-red-500 text-red-500' : 'text-white/30'}`} strokeWidth={1.5} />

</button>

))}

</div>

</div>


<div className="mb-6">

<label className="block text-xs font-bold uppercase tracking-wider mb-2 text-white/70">Cerita kamu</label>

<textarea

value={feedbackForm.message}

onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}

placeholder="Pengalaman pake Jago Data..."

rows={4}

className="w-full px-3 py-3 border-2 border-white/20 bg-white/5 text-white font-medium focus:outline-none focus:border-red-500 transition-colors placeholder:text-white/30"

/>

</div>


<button onClick={submitFeedback} className="px-6 py-3.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/30">

Kirim Testimoni <Send className="w-4 h-4" strokeWidth={2.5} />

</button>

</div>

</div>

</div>

</section>

</div>

);


// ====== FOOTER ======


const Footer = () => (

<footer className="bg-[#050E1F] text-white py-14 px-4 sm:px-6 border-t border-white/10">

<div className="max-w-7xl mx-auto">

<div className="grid md:grid-cols-12 gap-8 mb-10">

<div className="md:col-span-5">

<div className="flex items-center gap-2.5 mb-4">

<div className="w-10 h-10 bg-red-600 flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)' }}>

<Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />

</div>

<div>

<div className="font-black text-xl leading-none tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>JAGO DATA</div>

<div className="text-[9px] font-bold tracking-[0.25em] text-red-500 mt-0.5">AI · ML · STUDIO</div>

</div>

</div>

<p className="text-sm text-white/60 max-w-sm leading-relaxed">Solusi cerdas eksekusi skripsi & project data. Tim AI/ML profesional dengan harga mahasiswa.</p>

</div>

<div className="md:col-span-3">

<div className="font-black uppercase tracking-wider mb-4 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Navigasi</div>

<div className="space-y-2 text-sm">

{[['home', 'Beranda'], ['services', 'Layanan'], ['booking', 'Booking'], ['track', 'Lacak Order'], ['testimonials', 'Testimoni']].map(([k, l]) => (

<button key={k} onClick={() => navigate(k)} className="block text-white/60 hover:text-red-500 transition-colors">{l}</button>

))}

</div>

</div>

<div className="md:col-span-4">

<div className="font-black uppercase tracking-wider mb-4 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Kontak</div>

<div className="space-y-2 text-sm text-white/60">

<div className="flex items-center gap-2"><Mail className="w-4 h-4 text-red-500" /> hello@jagodata.id</div>

<div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-red-500" /> WA: 0812-3456-7890</div>

<div className="flex items-center gap-2"><Database className="w-4 h-4 text-red-500" /> Online · Indonesia</div>

</div>

</div>

</div>

<div className="border-t border-white/10 pt-6 flex justify-between items-center flex-wrap gap-3 text-xs text-white/40">

<div>© 2026 Jago Data Studio · Made with ☕ for mahasiswa</div>

<div>Privacy · Terms · Cookies</div>

</div>

</div>

</footer>

);


return (

<div className="min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

<style>{`

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

body { background: white; }

@keyframes slide-in { from { transform: translateX(120%); } to { transform: translateX(0); } }

.animate-slide-in { animation: slide-in 0.3s ease-out; }

* { -webkit-tap-highlight-color: transparent; }

::selection { background: #dc2626; color: white; }

input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }

`}</style>

<Nav />

<Toast />

{page === 'home' && <Home />}

{page === 'services' && <Services />}

{page === 'booking' && <Booking />}

{page === 'payment' && <Payment />}

{page === 'track' && <Track />}

{page === 'testimonials' && <Testimonials />}

<Footer />

</div>

);

} 
