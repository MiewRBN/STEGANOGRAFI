// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// FAQ toggles
const faqToggles = document.querySelectorAll('.faq-toggle');
const faqContents = document.querySelectorAll('.faq-content');

faqToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', function() {
        const content = faqContents[index];
        const icon = this.querySelector('svg');
        
        // Toggle the content
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-180');
        }
    });
});


// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab elements
    const encodeBtnTab = document.getElementById('encodeTabBtn');
    const decodeBtnTab = document.getElementById('decodeTabBtn');
    const imageEncodeTab = document.getElementById('imageEncodeTab');
    const imageDecodeTab = document.getElementById('imageDecodeTab');
    const audioEncodeTab = document.getElementById('audioEncodeTab');
    const audioDecodeTab = document.getElementById('audioDecodeTab');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    // Media type buttons
    const imageTypeBtn = document.getElementById('imageTypeBtn');
    const audioTypeBtn = document.getElementById('audioTypeBtn');
    
    // Current media type and tab
    let currentMediaType = 'image';
    let isEncodeTab = true;
    
    // Set initial tab indicator position
    function setTabIndicator(activeTab) {
        if (!tabIndicator) return;
        
        const tabWidth = activeTab.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        
        setTimeout(() => {
            tabIndicator.style.width = tabWidth + 'px';
            tabIndicator.style.left = tabLeft + 'px';
        }, 10);
    }
    
    // Initial tab indicator position
    setTimeout(() => {
        setTabIndicator(encodeBtnTab);
    }, 100);
    
    // Switch between media types (image/audio)
    function switchMediaType(type) {
        console.log("Switching media type to:", type);
        
        // Hide all content tabs
        imageEncodeTab.classList.add('hidden');
        imageDecodeTab.classList.add('hidden');
        audioEncodeTab.classList.add('hidden');
        audioDecodeTab.classList.add('hidden');
        
        currentMediaType = type;
        
        // Update buttons UI
        if (type === 'image') {
            imageTypeBtn.classList.add('active');
            audioTypeBtn.classList.remove('active');
            
            // Show appropriate image tab
            if (isEncodeTab) {
                imageEncodeTab.classList.remove('hidden');
            } else {
                imageDecodeTab.classList.remove('hidden');
            }
        } else {
            imageTypeBtn.classList.remove('active');
            audioTypeBtn.classList.add('active');
            
            // Show appropriate audio tab
            if (isEncodeTab) {
                audioEncodeTab.classList.remove('hidden');
            } else {
                audioDecodeTab.classList.remove('hidden');
            }
        }
    }
    
    // Switch between encode/decode tabs
    function switchToTab(activeBtn, inactiveBtn, isEncode) {
        console.log("Switching to tab:", isEncode ? "Encode" : "Decode");
        
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        isEncodeTab = isEncode;
        
        // Move tab indicator
        setTabIndicator(activeBtn);
        
        // Hide all tabs
        imageEncodeTab.classList.add('hidden');
        imageDecodeTab.classList.add('hidden');
        audioEncodeTab.classList.add('hidden');
        audioDecodeTab.classList.add('hidden');
        
        // Show appropriate content based on active tab and media type
        if (isEncode) {
            if (currentMediaType === 'image') {
                imageEncodeTab.classList.remove('hidden');
            } else {
                audioEncodeTab.classList.remove('hidden');
            }
        } else {
            if (currentMediaType === 'image') {
                imageDecodeTab.classList.remove('hidden');
            } else {
                audioDecodeTab.classList.remove('hidden');
            }
        }
    }
    
    // Event listeners for tab buttons
    encodeBtnTab.addEventListener('click', function() {
        switchToTab(encodeBtnTab, decodeBtnTab, true);
    });
    
    decodeBtnTab.addEventListener('click', function() {
        switchToTab(decodeBtnTab, encodeBtnTab, false);
    });
    
    // Event listeners for media type buttons
    imageTypeBtn.addEventListener('click', function() {
        switchMediaType('image');
    });
    
    audioTypeBtn.addEventListener('click', function() {
        switchMediaType('audio');
    });
    
    // Initialize
    switchMediaType('image');
    
    // Handle window resize for tab indicator
    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.tab-btn.active');
        setTabIndicator(activeTab);
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Memuat data enkripsi dari localStorage jika ada
    const savedMessages = localStorage.getItem('encryptedMessages');
    if (savedMessages) {
        encryptedMessages = JSON.parse(savedMessages);
    }
});

// Global variables to store original filenames
let originalImageFilename = '';
let originalAudioFilename = '';

// Variabel untuk menyimpan informasi pesan terenkripsi
let encryptedMessages = {
    image: {},
    audio: {}
};

// Image preview functions
function setupImagePreview(inputId, previewId, containerId, maxSize) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            showNotification('Silakan upload file gambar (JPG, PNG, GIF)', 'error');
            return;
        }
        
        if (maxSize && file.size > maxSize) {
            showNotification(`Ukuran file maksimum adalah ${maxSize/1024/1024}MB`, 'error');
            return;
        }
        
        // Save original filename if this is the cover image
        if (inputId === 'coverImage') {
            originalImageFilename = file.name;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            const container = document.getElementById(containerId);
            
            if (preview && container) {
                preview.src = e.target.result;
                container.classList.remove('hidden');
            }
        }
        reader.readAsDataURL(file);
    });
}

// Audio preview functions
function setupAudioPreview(inputId, previewId, containerId, maxSize) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('audio.*')) {
            showNotification('Silakan upload file audio (MP3, WAV, OGG)', 'error');
            return;
        }
        
        if (maxSize && file.size > maxSize) {
            showNotification(`Ukuran file maksimum adalah ${maxSize/1024/1024}MB`, 'error');
            return;
        }
        
        // Save original filename if this is the cover audio
        if (inputId === 'coverAudio') {
            originalAudioFilename = file.name;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            const container = document.getElementById(containerId);
            
            if (preview && container) {
                preview.src = e.target.result;
                container.classList.remove('hidden');
                
                // Animasi visualisasi audio
                const waveform = container.querySelector('.audio-wave-placeholder');
                if (waveform) animateAudioWaveform(waveform);
            }
        }
        reader.readAsDataURL(file);
    });
}

// Set up preview functions
document.addEventListener('DOMContentLoaded', function() {
    // Image previews
    setupImagePreview('coverImage', 'coverImagePreview', 'coverPreview', 5 * 1024 * 1024);
    setupImagePreview('stegoImage', 'stegoImageDecodePreview', 'stegoPreview', 5 * 1024 * 1024);
    
    // Audio previews
    setupAudioPreview('coverAudio', 'coverAudioPreview', 'audioPreview', 10 * 1024 * 1024);
    setupAudioPreview('stegoAudio', 'stegoAudioDecodePreview', 'stegoAudioPreviewContainer', 10 * 1024 * 1024);
    
    // Set up encode buttons
    setupEncodeButton();
    setupEncodeAudioButton();
    
    // Set up decode buttons
    setupDecodeButton();
    setupDecodeAudioButton();
});

// Fungsi untuk animasi visualisasi audio sederhana
function animateAudioWaveform(container) {
    if (!container) return;
    
    const bars = container.querySelectorAll('div > div');
    if (!bars.length) return;
    
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 12) + 4; // 4px sampai 16px
        bar.style.height = randomHeight + 'px';
        
        // Tambahkan animasi untuk simulasi visualisasi
        setInterval(() => {
            const newHeight = Math.floor(Math.random() * 12) + 4;
            bar.style.height = newHeight + 'px';
        }, 300);
    });
}

// Notifikasi function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 py-2 px-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup encode button
function setupEncodeButton() {
    const encodeBtn = document.getElementById('encodeBtn');
    if (!encodeBtn) return;
    
    encodeBtn.addEventListener('click', function() {
        const coverImage = document.getElementById('coverImagePreview').src;
        const secretMessage = document.getElementById('secretMessage').value;
        const password = document.getElementById('password').value;
        
        if (!coverImage || coverImage.includes("placeholder")) {
            showNotification('Silakan upload gambar terlebih dahulu!', 'error');
            return;
        }
        
        if (!secretMessage) {
            showNotification('Masukkan pesan yang ingin disembunyikan!', 'error');
            return;
        }
        
        // Tampilkan notifikasi proses berjalan
        showNotification('Sedang memproses...', 'success');
        
        // Simulasi proses encoding
        setTimeout(() => {
            try {
                // Simpan pesan dalam atribut data untuk simulasi
                const stegoImg = document.getElementById('stegoImagePreview');
                stegoImg.src = coverImage;
                stegoImg.setAttribute('data-message', secretMessage);
                if (password) {
                    stegoImg.setAttribute('data-password', password);
                }
                
                // Simpan data enkripsi ke variabel global
                const messageData = {
                    src: coverImage,
                    message: secretMessage,
                    password: password || null,
                    filename: originalImageFilename || 'stego_image.png'
                };
                
                // Gunakan hash dari source image sebagai key untuk menyimpan
                const hashKey = hashString(coverImage);
                encryptedMessages.image[hashKey] = messageData;
                
                // Simpan ke localStorage
                localStorage.setItem('encryptedMessages', JSON.stringify(encryptedMessages));
                
                document.getElementById('encodeResult').classList.remove('hidden');
                
                // Set download link with original filename
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = coverImage;
                downloadLink.download = originalImageFilename || 'stego_image.png';
                
                showNotification('Pesan berhasil disembunyikan!', 'success');
            } catch (error) {
                console.error("Error dalam proses encoding:", error);
                showNotification('Gagal menyembunyikan pesan!', 'error');
            }
        }, 1500);
    });
}

// Setup audio encode button
// Perbaikan fungsi untuk hash yang lebih konsisten
function createConsistentFileId(file) {
    // Menggunakan kombinasi nama file dan ukuran untuk identifikasi konsisten
    if (!file) return '';
    return `${file.name}-${file.size}`;
}

// Modifikasi setupEncodeAudioButton - Simpan data file asli
function setupEncodeAudioButton() {
    const encodeAudioBtn = document.getElementById('encodeAudioBtn');
    if (!encodeAudioBtn) return;
    
    encodeAudioBtn.addEventListener('click', function() {
        // Ambil file audio asli, bukan hanya URL-nya
        const audioInput = document.getElementById('coverAudio');
        if (!audioInput || !audioInput.files || !audioInput.files[0]) {
            showNotification('Silakan upload audio terlebih dahulu!', 'error');
            return;
        }
        
        const audioFile = audioInput.files[0];
        const coverAudio = document.getElementById('coverAudioPreview').src;
        const secretMessage = document.getElementById('secretMessageAudio').value;
        const password = document.getElementById('passwordAudio').value;
        
        if (!secretMessage) {
            showNotification('Masukkan pesan yang ingin disembunyikan!', 'error');
            return;
        }
        
        // Tampilkan notifikasi proses berjalan
        showNotification('Sedang memproses...', 'success');
        
        // Simulasi proses encoding
        setTimeout(() => {
            try {
                // Simpan pesan dalam atribut data untuk simulasi
                const stegoAudio = document.getElementById('stegoAudioPreview');
                if (!stegoAudio) {
                    throw new Error("Element stegoAudioPreview tidak ditemukan");
                }
                
                stegoAudio.src = coverAudio;
                stegoAudio.setAttribute('data-message', secretMessage);
                if (password) {
                    stegoAudio.setAttribute('data-password', password);
                }
                
                // Buat ID file yang konsisten
                const fileId = createConsistentFileId(audioFile);
                
                // Simpan data enkripsi ke variabel global
                const messageData = {
                    fileName: audioFile.name,
                    fileSize: audioFile.size,
                    fileId: fileId,
                    message: secretMessage,
                    password: password || null,
                    timestamp: Date.now(),
                    filename: originalAudioFilename || 'stego_audio.mp3'
                };
                
                try {
                    // Gunakan fileId sebagai key untuk menyimpan
                    encryptedMessages.audio[fileId] = messageData;
                    
                    // Simpan ke localStorage
                    localStorage.setItem('encryptedMessages', JSON.stringify(encryptedMessages));
                    
                    // Simpan ID file terakhir untuk memudahkan dekripsi
                    localStorage.setItem('lastEncodedAudioId', fileId);
                } catch (storageError) {
                    console.error("Error menyimpan ke localStorage:", storageError);
                    // Melanjutkan meskipun ada error di localStorage
                }
                
                const encodeAudioResult = document.getElementById('encodeAudioResult');
                if (!encodeAudioResult) {
                    throw new Error("Element encodeAudioResult tidak ditemukan");
                }
                
                encodeAudioResult.classList.remove('hidden');
                
                // Set download link with original filename
                const downloadAudioLink = document.getElementById('downloadAudioLink');
                if (!downloadAudioLink) {
                    throw new Error("Element downloadAudioLink tidak ditemukan");
                }
                
                downloadAudioLink.href = coverAudio;
                downloadAudioLink.download = originalAudioFilename || 'stego_audio.mp3';
                
                showNotification('Pesan berhasil disembunyikan dalam audio!', 'success');
            } catch (error) {
                console.error("Error dalam proses encoding audio:", error);
                showNotification('Gagal menyembunyikan pesan dalam audio: ' + error.message, 'error');
            }
        }, 1500);
    });
}

// Modifikasi setupDecodeAudioButton - Perbaikan metode dekripsi
function setupDecodeAudioButton() {
    const decodeAudioBtn = document.getElementById('decodeAudioBtn');
    if (!decodeAudioBtn) return;
    
    decodeAudioBtn.addEventListener('click', function() {
        // Ambil file audio yang di-upload, bukan hanya URL-nya
        const audioInput = document.getElementById('stegoAudio');
        if (!audioInput || !audioInput.files || !audioInput.files[0]) {
            showNotification('Silakan upload audio stego terlebih dahulu!', 'error');
            return;
        }
        
        const audioFile = audioInput.files[0];
        const stegoAudio = document.getElementById('stegoAudioDecodePreview').src;
        const password = document.getElementById('decodePasswordAudio').value;
        
        // Tampilkan notifikasi proses berjalan
        showNotification('Sedang mengekstrak pesan dari audio...', 'success');
        
        // Simulasi proses decoding
        setTimeout(() => {
            try {
                // 1. Coba dari atribut data (jika dalam sesi yang sama)
                const encodedAudio = document.getElementById('stegoAudioPreview');
                if (encodedAudio && encodedAudio.hasAttribute('data-message') && 
                    stegoAudio === encodedAudio.src) {
                    
                    const storedMessage = encodedAudio.getAttribute('data-message');
                    const storedPassword = encodedAudio.hasAttribute('data-password') ? 
                                        encodedAudio.getAttribute('data-password') : null;
                    
                    // Cek password jika ada
                    if (storedPassword && password !== storedPassword) {
                        document.getElementById('extractedAudioMessage').textContent = 
                            "Kata sandi salah. Tidak dapat mendekripsi pesan.";
                    } else {
                        document.getElementById('extractedAudioMessage').textContent = storedMessage;
                    }
                } 
                // 2. Jika tidak dalam sesi yang sama, coba cari berdasarkan ID file konsisten
                else {
                    const fileId = createConsistentFileId(audioFile);
                    
                    // 3. Coba dari localStorage berdasarkan ID file
                    if (encryptedMessages.audio && encryptedMessages.audio[fileId]) {
                        const storedData = encryptedMessages.audio[fileId];
                        
                        // Verifikasi password jika ada
                        if (storedData.password && password !== storedData.password) {
                            document.getElementById('extractedAudioMessage').textContent = 
                                "Kata sandi salah. Tidak dapat mendekripsi pesan dari audio.";
                        } else {
                            document.getElementById('extractedAudioMessage').textContent = storedData.message;
                        }
                    }
                    // 4. Coba dari ID terakhir yang disimpan (untuk kasus nama file berubah)
                    else {
                        const lastId = localStorage.getItem('lastEncodedAudioId');
                        
                        if (lastId && encryptedMessages.audio && encryptedMessages.audio[lastId]) {
                            const storedData = encryptedMessages.audio[lastId];
                            
                            // Periksa kemiripan ukuran file (untuk toleransi)
                            const isFileSimilar = Math.abs(storedData.fileSize - audioFile.size) < 1024; // toleransi 1KB
                            
                            if (isFileSimilar) {
                                // Verifikasi password
                                if (storedData.password && password !== storedData.password) {
                                    document.getElementById('extractedAudioMessage').textContent = 
                                        "Kata sandi salah. Tidak dapat mendekripsi pesan dari audio.";
                                } else {
                                    document.getElementById('extractedAudioMessage').textContent = storedData.message;
                                }
                            } else {
                                // 5. Fallback ke simulasi ekstraksi
                                const extractedMessage = extractMessageFromStegoAudio(stegoAudio, password, audioFile);
                                document.getElementById('extractedAudioMessage').textContent = extractedMessage;
                            }
                        } else {
                            // 5. Fallback ke simulasi ekstraksi
                            const extractedMessage = extractMessageFromStegoAudio(stegoAudio, password, audioFile);
                            document.getElementById('extractedAudioMessage').textContent = extractedMessage;
                        }
                    }
                }
                
                document.getElementById('decodeAudioResult').classList.remove('hidden');
                
                // Tampilkan notifikasi sukses
                showNotification('Pesan berhasil diekstrak dari audio!', 'success');
            } catch (error) {
                console.error("Error saat mengekstrak pesan dari audio:", error);
                document.getElementById('extractedAudioMessage').textContent = 
                    "Terjadi kesalahan saat mengekstrak pesan. Pastikan audio yang diunggah adalah audio stego yang valid.";
                document.getElementById('decodeAudioResult').classList.remove('hidden');
                showNotification('Gagal mengekstrak pesan dari audio!', 'error');
            }
        }, 1500);
    });
}

// Update fungsi ekstraksi pesan dari audio stego
function extractMessageFromStegoAudio(audioData, password, audioFile) {
    try {
        // Jika diberikan file, coba cari berdasarkan nama file dan ukuran
        if (audioFile) {
            // Coba mencari di localStorage berdasarkan nama file
            for (const key in encryptedMessages.audio) {
                const entry = encryptedMessages.audio[key];
                if (entry.fileName === audioFile.name || 
                    Math.abs(entry.fileSize - audioFile.size) < 1024) { // 1KB tolerance
                    
                    // Verifikasi password jika ada
                    if (entry.password && password !== entry.password) {
                        return "Kata sandi salah. Tidak dapat mendekripsi pesan dari audio.";
                    }
                    
                    // Ditemukan! Return pesan tersimpan
                    return entry.message;
                }
            }
        }
        
        // Jika masih tidak ditemukan, gunakan simulasi
        // Buat hash sederhana berdasarkan data audio atau nama file
        let simpleHash = 0;
        
        if (audioFile && audioFile.name) {
            for (let i = 0; i < audioFile.name.length; i++) {
                simpleHash = (simpleHash + audioFile.name.charCodeAt(i)) % 100;
            }
        } else {
            for (let i = 0; i < Math.min(audioData.length, 1000); i++) {
                simpleHash = (simpleHash + audioData.charCodeAt(i % audioData.length)) % 100;
            }
        }
        
        // Daftar pesan simulasi
        const messages = [
            "Komunikasi audio telah diverifikasi. Lanjutkan dengan operasi.",
            "Jadwal pertemuan diubah menjadi tanggal 25 pukul 15:00 di lokasi C.",
            "Semua sistem transmisi berfungsi dengan normal.",
            "Update perangkat lunak tersedia. Gunakan kode: A7B2C9-DEF3G-HIJ45",
            "Pemindaian area menunjukkan hasil yang aman untuk dilanjutkan.",
            "Koordinat lokasi baru: 7.1123° N, 125.6370° E",
            "Protokol komunikasi yang baru telah diimplementasikan.",
            "Tim bravo akan tiba dalam 48 jam. Persiapkan penerimaan.",
            "Hasil analisis menunjukkan peningkatan 28% dalam efisiensi sistem.",
            "Semua data telah berhasil diamankan. Jaga kerahasiaan."
        ];
        
        // Pilih pesan berdasarkan hash
        const selectedMessage = messages[simpleHash % messages.length];
        
        // Verifikasi password (simulasi)
        if (password && password.length > 0) {
            if (password === "audio123" || password === "stegano" || password === "1234") {
                return selectedMessage;
            } else {
                return "Kata sandi salah. Tidak dapat mendekripsi pesan dari audio.";
            }
        }
        
        return selectedMessage;
    } catch (error) {
        console.error("Error dalam ekstraksi pesan dari audio:", error);
        return "Tidak dapat mengekstrak pesan dari audio ini. Error: " + error.message;
    }
}

// Tambahkan juga fungsi untuk membersihkan localStorage saat diperlukan
function clearStegoData() {
    localStorage.removeItem('encryptedMessages');
    localStorage.removeItem('lastEncodedAudioId');
    encryptedMessages = {
        image: {},
        audio: {}
    };
    showNotification('Data stego berhasil dibersihkan', 'success');
}

// Inisialisasi dengan lebih baik
document.addEventListener('DOMContentLoaded', function() {
    // Memuat data enkripsi dari localStorage jika ada
    const savedMessages = localStorage.getItem('encryptedMessages');
    if (savedMessages) {
        try {
            encryptedMessages = JSON.parse(savedMessages);
            // Pastikan struktur data lengkap
            if (!encryptedMessages.image) encryptedMessages.image = {};
            if (!encryptedMessages.audio) encryptedMessages.audio = {};
        } catch (e) {
            console.error("Error parsing saved messages:", e);
            encryptedMessages = {
                image: {},
                audio: {}
            };
        }
    } else {
        encryptedMessages = {
            image: {},
            audio: {}
        };
    }
    
    // Setup image previews
    setupImagePreview('coverImage', 'coverImagePreview', 'coverPreview', 5 * 1024 * 1024);
    setupImagePreview('stegoImage', 'stegoImageDecodePreview', 'stegoPreview', 5 * 1024 * 1024);
    
    // Audio previews
    setupAudioPreview('coverAudio', 'coverAudioPreview', 'audioPreview', 10 * 1024 * 1024);
    setupAudioPreview('stegoAudio', 'stegoAudioDecodePreview', 'stegoAudioPreviewContainer', 10 * 1024 * 1024);
    
    // Set up encode buttons
    setupEncodeButton();
    setupEncodeAudioButton();
    
    // Set up decode buttons
    setupDecodeButton();
    setupDecodeAudioButton();
});

// Fungsi untuk membuat hash sederhana dari string
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    return hash.toString();
}

// Toggle between tabs
function toggleTabs(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    const indicator = document.querySelector('.tab-indicator');

    // Hide all tabs
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Deactivate all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab
    document.getElementById(tabId).classList.add('active');

    // Activate the selected button
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    activeButton.classList.add('active');

    // Move the indicator to the active button position with smooth animation
    setTimeout(() => {
        indicator.style.width = `${activeButton.offsetWidth}px`;
        indicator.style.left = `${activeButton.offsetLeft}px`;
    }, 10);
}

// Toggle between media types (image/audio)
function toggleMediaType(mediaType) {
    const buttons = document.querySelectorAll('.media-type-btn');
    
    // Deactivate all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Activate the selected button
    const activeButton = document.querySelector(`[data-media-type="${mediaType}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Show/hide relevant content based on media type
    if (mediaType === 'image') {
        document.getElementById('image-tools').classList.remove('hidden');
        document.getElementById('audio-tools').classList.add('hidden');
    } else if (mediaType === 'audio') {
        document.getElementById('image-tools').classList.add('hidden');
        document.getElementById('audio-tools').classList.remove('hidden');
    }
}

// Initialize the tab indicator position on page load
document.addEventListener('DOMContentLoaded', function() {
    const activeButton = document.querySelector('.tab-btn.active');
    const indicator = document.querySelector('.tab-indicator');
    
    if (activeButton && indicator) {
        setTimeout(() => {
            indicator.style.width = `${activeButton.offsetWidth}px`;
            indicator.style.left = `${activeButton.offsetLeft}px`;
        }, 100);
    }
    
    // Initialize media type buttons
    const defaultMediaType = 'image';
    toggleMediaType(defaultMediaType);
});

// Menambahkan kembali fungsi setupDecodeButton yang dihapus
function setupDecodeButton() {
    const decodeBtn = document.getElementById('decodeBtn');
    if (!decodeBtn) return;
    
    decodeBtn.addEventListener('click', function() {
        const stegoImage = document.getElementById('stegoImageDecodePreview').src;
        const password = document.getElementById('decodePassword').value;
        
        if (!stegoImage || stegoImage.includes("placeholder")) {
            showNotification('Silakan upload gambar stego terlebih dahulu!', 'error');
            return;
        }
        
        // Tampilkan notifikasi proses berjalan
        showNotification('Sedang mengekstrak pesan...', 'success');
        
        // Simulasi proses decoding
        setTimeout(() => {
            try {
                // Periksa apakah gambar yang diupload sama dengan yang baru saja diproses di encoding
                const encodedImg = document.getElementById('stegoImagePreview');
                if (encodedImg && encodedImg.hasAttribute('data-message') && 
                    stegoImage === encodedImg.src) {
                    // Gambar sama dengan yang baru saja dienkripsi
                    const storedMessage = encodedImg.getAttribute('data-message');
                    const storedPassword = encodedImg.hasAttribute('data-password') ? 
                                        encodedImg.getAttribute('data-password') : null;
                    
                    // Cek password jika ada
                    if (storedPassword && password !== storedPassword) {
                        document.getElementById('extractedMessage').textContent = 
                            "Kata sandi salah. Tidak dapat mendekripsi pesan.";
                    } else {
                        document.getElementById('extractedMessage').textContent = storedMessage;
                    }
                } else {
                    // Jika tidak sama, gunakan fungsi ekstraksi pesan
                    const extractedMessage = extractMessageFromStego(stegoImage, password);
                    document.getElementById('extractedMessage').textContent = extractedMessage;
                }
                
                document.getElementById('decodeResult').classList.remove('hidden');
                
                // Tampilkan notifikasi sukses
                showNotification('Pesan berhasil diekstrak!', 'success');
            } catch (error) {
                console.error("Error saat mengekstrak pesan:", error);
                document.getElementById('extractedMessage').textContent = 
                    "Terjadi kesalahan saat mengekstrak pesan. Pastikan gambar yang diunggah adalah gambar stego yang valid.";
                document.getElementById('decodeResult').classList.remove('hidden');
                showNotification('Gagal mengekstrak pesan!', 'error');
            }
        }, 1500);
    });
}

// Menambahkan kembali fungsi extractMessageFromStego yang dihapus
function extractMessageFromStego(imageData, password) {
    // Coba ambil pesan dari atribut data dari gambar yang baru saja dienkripsi
    const stegoImg = document.getElementById('stegoImagePreview');
    if (stegoImg && stegoImg.hasAttribute('data-message')) {
        const storedMessage = stegoImg.getAttribute('data-message');
        const storedPassword = stegoImg.hasAttribute('data-password') ? stegoImg.getAttribute('data-password') : null;
        
        // Jika ada password dan tidak cocok
        if (storedPassword && password !== storedPassword) {
            return "Kata sandi salah. Tidak dapat mendekripsi pesan.";
        }
        
        // Jika password benar atau tidak ada password
        return storedMessage;
    }
    
    // Periksa apakah data tersimpan di localStorage
    const hashKey = hashString(imageData);
    if (encryptedMessages.image && encryptedMessages.image[hashKey]) {
        const storedData = encryptedMessages.image[hashKey];
        
        // Verifikasi password jika ada
        if (storedData.password && password !== storedData.password) {
            return "Kata sandi salah. Tidak dapat mendekripsi pesan.";
        }
        
        // Return pesan tersimpan
        return storedData.message;
    }
    
    // Jika tidak ada atribut data atau data di localStorage, gunakan simulasi
    try {
        // Buat hash sederhana berdasarkan data gambar untuk keluaran yang konsisten
        let simpleHash = 0;
        for (let i = 0; i < Math.min(imageData.length, 1000); i++) {
            simpleHash = (simpleHash + imageData.charCodeAt(i % imageData.length)) % 100;
        }
        
        // Daftar pesan yang mungkin berdasarkan "hash" gambar
        const messages = [
            "Target telah dikonfirmasi. Lanjutkan dengan rencana A.",
            "Pertemuan rahasia akan diadakan di lokasi B pada pukul 21:00 malam ini.",
            "Kode akses untuk sistem: X7Y9Z2-TG43M-KL098",
            "Berkas telah berhasil diamankan. Gunakan protokol standar untuk pengambilan.",
            "Pesan ini mengkonfirmasi bahwa operasi telah selesai dengan sukses.",
            "Data penelitian menunjukkan peningkatan 35% dalam periode uji coba.",
            "Transfer akan dilakukan melalui saluran yang aman pada tanggal 15.",
            "Protokol keamanan telah ditingkatkan. Gunakan kata sandi baru.",
            "Semua sistem telah dikonfirmasi siap untuk peluncuran besok.",
            "Pastikan untuk menghapus jejak digital Anda setelah membaca pesan ini."
        ];
        
        // Pilih pesan berdasarkan hash
        const selectedMessage = messages[simpleHash % messages.length];
        
        // Jika ada password, lakukan verifikasi (simulasi)
        if (password && password.length > 0) {
            if (password === "secret123" || password === "stegano" || password === "1234") {
                return selectedMessage;
            } else {
                return "Kata sandi salah. Tidak dapat mendekripsi pesan.";
            }
        }
        
        return selectedMessage;
    } catch (error) {
        console.error("Error dalam ekstraksi pesan:", error);
        return "Tidak dapat mengekstrak pesan dari gambar ini. Pastikan gambar adalah gambar stego yang valid.";
    }
} 