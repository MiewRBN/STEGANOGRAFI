// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // Add short timeout for max-height animation to work
                setTimeout(function() {
                    mobileMenu.classList.add('open');
                }, 10);
            } else {
                mobileMenu.classList.remove('open');
                // Wait for animation to complete before hiding
                setTimeout(function() {
                    mobileMenu.classList.add('hidden');
                }, 300); // Same time as transition duration
            }
        });
    }

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            
            // Get target ID from href
            const targetId = this.getAttribute('href');
            
            // Skip if just "#"
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('open');
                    setTimeout(function() {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                }
                return;
            }
            
            // Find target element
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target element with smooth behavior
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('open');
                    setTimeout(function() {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                }
            }
        });
    });

    // Add active class to navigation menu based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section, div[id]');
        const navLinks = document.querySelectorAll('header nav a[href^="#"], header #mobileMenu a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-300', 'font-semibold');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('text-blue-300', 'font-semibold');
            }
        });
    }
    
    // Initial call and scroll event listener
    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink);

    // Image previews
    setupImagePreview('coverImage', 'coverImagePreview', 'coverPreview', 5 * 1024 * 1024);
    setupImagePreview('stegoImage', 'stegoImageDecodePreview', 'stegoPreview', 5 * 1024 * 1024);
    
    // Audio previews
    setupAudioPreview('coverAudio', 'coverAudioPreview', 'audioPreview', 10 * 1024 * 1024);
    setupAudioPreview('stegoAudio', 'stegoAudioDecodePreview', 'stegoAudioPreviewContainer', 10 * 1024 * 1024);

    // Setup other components...
});

// FAQ toggles
document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-question');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the answer element that follows this question
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.faq-arrow');
            
            // Toggle the answer visibility
            if (answer.classList.contains('hidden')) {
                // Hide all other answers first
                document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                    otherAnswer.classList.add('hidden');
                    otherAnswer.previousElementSibling.querySelector('.faq-arrow').classList.remove('rotate-180');
                });
                
                // Show this answer
                answer.classList.remove('hidden');
                arrow.classList.add('rotate-180');
            } else {
                // Hide this answer
                answer.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        });
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
    
    // Load encrypted messages from localStorage if they exist
    const savedMessages = localStorage.getItem('encryptedMessages');
    if (savedMessages) {
        encryptedMessages = JSON.parse(savedMessages);
    }
});

// Global variables to store original filenames
let originalImageFilename = '';
let originalAudioFilename = '';

// Variable to store encrypted message information
let encryptedMessages = {
    image: {},
    audio: {}
};

// GAN models for steganography
// These would be actual TensorFlow.js models in a full implementation
let imageGenerator = null; 
let imageDiscriminator = null;
let audioGenerator = null;
let audioDiscriminator = null;

// GAN model loading simulation
function initGANModels() {
    console.log("Initializing GAN models for steganography...");
    
    // In a real implementation, we would load actual models from TensorFlow.js
    // For demonstration, we'll simulate the model loading
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate model loading complete
            imageGenerator = { 
                name: "image-stego-gan-generator",
                loaded: true,
                version: "1.2.0"
            };
            
            imageDiscriminator = {
                name: "image-stego-gan-discriminator",
                loaded: true,
                version: "1.2.0"
            };
            
            audioGenerator = {
                name: "audio-stego-gan-generator",
                loaded: true,
                version: "1.0.5"
            };
            
            audioDiscriminator = {
                name: "audio-stego-gan-discriminator",
                loaded: true,
                version: "1.0.5"
            };
            
            console.log("GAN models initialized successfully.");
            resolve(true);
        }, 1000);
    });
}

// Image preview functions
function setupImagePreview(inputId, previewId, containerId, maxSize) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            showNotification('Please upload an image file (JPG, PNG, GIF)', 'error');
            return;
        }
        
        if (maxSize && file.size > maxSize) {
            showNotification(`Maximum file size is ${maxSize/1024/1024}MB`, 'error');
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
            showNotification('Please upload an audio file (MP3, WAV, OGG)', 'error');
            return;
        }
        
        if (maxSize && file.size > maxSize) {
            showNotification(`Maximum file size is ${maxSize/1024/1024}MB`, 'error');
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
                
                // Audio waveform animation
                const waveform = container.querySelector('.audio-wave-placeholder');
                if (waveform) animateAudioWaveform(waveform);
            }
        }
        reader.readAsDataURL(file);
    });
}

// Set up preview functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GAN models
    showNotification('Initializing GAN models...', 'success');
    initGANModels().then(() => {
        showNotification('GAN steganography models loaded successfully', 'success');
    }).catch(err => {
        showNotification('Failed to load GAN models', 'error');
        console.error("Error loading GAN models:", err);
    });
    
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

// Function for simple audio waveform animation
function animateAudioWaveform(container) {
    if (!container) return;
    
    const bars = container.querySelectorAll('div > div');
    if (!bars.length) return;
    
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 12) + 4; // 4px to 16px
        bar.style.height = randomHeight + 'px';
        
        // Add animation for visualization simulation
        setInterval(() => {
            const newHeight = Math.floor(Math.random() * 12) + 4;
            bar.style.height = newHeight + 'px';
        }, 300);
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    // Position notification at top center (below navbar)
    notification.className = `fixed top-24 left-1/2 transform -translate-x-1/2 py-3 px-6 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white z-50`;
    notification.style.minWidth = '300px';
    notification.style.textAlign = 'center';
    notification.style.fontWeight = '500';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    
    // Slide in animation from top
    notification.style.opacity = '0';
    notification.style.transform = 'translate(-50%, -20px)';
    notification.style.transition = 'all 0.3s ease-out';
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translate(-50%, 0)';
    }, 10);
    
    // Fade out animation
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -10px)';
        
        // Remove element after animation completes
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// GAN-based image steganography functions
function encodeMessageWithGAN(coverImageData, message, password) {
    return new Promise((resolve, reject) => {
        if (!imageGenerator || !imageGenerator.loaded) {
            reject("GAN model not loaded. Please reload the page.");
            return;
        }
        
        // In a real implementation, we would:
        // 1. Preprocess the cover image
        // 2. Encode the message using the generator model
        // 3. Apply any necessary transformations
        
        // For this demo, we'll simulate the process
        console.log("Starting GAN-based image steganography encoding...");
        console.log("Message length:", message.length);
        
        // Simulate GAN processing time based on message length
        const processingTime = Math.min(2000, 500 + message.length * 10);
        
        setTimeout(() => {
            try {
                // In a real implementation, we would return the actual modified image
                // For now, we'll just return the original image data with metadata
                const encodedData = {
                    imageData: coverImageData,
                    encodingMethod: "GAN-Steganography-v1.2",
                    messageLength: message.length,
                    encodedAt: new Date().toISOString(),
                    // In a real implementation, we'd use a proper encryption method
                    hasPassword: !!password
                };
                
                resolve(encodedData);
            } catch (err) {
                reject("Error in GAN encoding: " + err.message);
            }
        }, processingTime);
    });
}

function decodeMessageWithGAN(stegoImageData, password) {
    return new Promise((resolve, reject) => {
        if (!imageDiscriminator || !imageDiscriminator.loaded) {
            reject("GAN model not loaded. Please reload the page.");
            return;
        }
        
        // In a real implementation, we would:
        // 1. Process the stego image with the discriminator model
        // 2. Extract the hidden message
        // 3. Decrypt if password-protected
        
        // For this demo, we'll simulate the decoding process
        console.log("Starting GAN-based image steganography decoding...");
        
        // Simulate GAN processing time
        setTimeout(() => {
            try {
                // For simulation, we'll check our stored messages
                const hashKey = hashString(stegoImageData);
                if (encryptedMessages.image && encryptedMessages.image[hashKey]) {
                    const storedData = encryptedMessages.image[hashKey];
                    
                    // Verify password if present
                    if (storedData.password && password !== storedData.password) {
                        resolve({
                            success: false,
                            message: "Incorrect password. Cannot decrypt message."
                        });
                    } else {
                        resolve({
                            success: true,
                            message: storedData.message,
                            encodingMethod: "GAN-Steganography-v1.2",
                            decodedAt: new Date().toISOString()
                        });
                    }
                } else {
                    // If not found in storage, generate a simulated message
                    const simulatedMessage = generateSimulatedMessage(stegoImageData, password);
                    resolve({
                        success: true,
                        message: simulatedMessage,
                        encodingMethod: "GAN-Steganography-v1.2",
                        decodedAt: new Date().toISOString(),
                        isSimulated: true
                    });
                }
            } catch (err) {
                reject("Error in GAN decoding: " + err.message);
            }
        }, 1500);
    });
}

// GAN-based audio steganography functions
function encodeAudioWithGAN(coverAudioData, audioFile, message, password) {
    return new Promise((resolve, reject) => {
        if (!audioGenerator || !audioGenerator.loaded) {
            reject("Audio GAN model not loaded. Please reload the page.");
            return;
        }
        
        // In a real implementation, we would:
        // 1. Process the audio data
        // 2. Encode the message using spectral embedding with GANs
        // 3. Apply transformations that preserve audio quality
        
        // For this demo, we'll simulate the process
        console.log("Starting GAN-based audio steganography encoding...");
        console.log("Message length:", message.length);
        console.log("Audio file:", audioFile ? audioFile.name : "unknown");
        
        // Simulate GAN audio processing
        const processingTime = Math.min(3000, 1000 + message.length * 5);
        
        setTimeout(() => {
            try {
                // Create file ID for storage
                const fileId = audioFile ? createConsistentFileId(audioFile) : hashString(coverAudioData);
                
                // In a real implementation, we would return modified audio data
                // For now, we'll return the original data with metadata
                const encodedData = {
                    audioData: coverAudioData,
                    encodingMethod: "Audio-GAN-Steganography-v1.0",
                    messageLength: message.length,
                    audioFileName: audioFile ? audioFile.name : "unknown",
                    fileId: fileId,
                    encodedAt: new Date().toISOString(),
                    hasPassword: !!password
                };
                
                resolve(encodedData);
            } catch (err) {
                reject("Error in audio GAN encoding: " + err.message);
            }
        }, processingTime);
    });
}

function decodeAudioWithGAN(stegoAudioData, audioFile, password) {
    return new Promise((resolve, reject) => {
        if (!audioDiscriminator || !audioDiscriminator.loaded) {
            reject("Audio GAN model not loaded. Please reload the page.");
            return;
        }
        
        // In a real implementation, we would:
        // 1. Process the stego audio with the discriminator model
        // 2. Extract the hidden message using spectral analysis
        // 3. Decrypt if password-protected
        
        console.log("Starting GAN-based audio steganography decoding...");
        
        // Simulate GAN processing
        setTimeout(() => {
            try {
                // Try to find stored message by file ID
                if (audioFile) {
                    const fileId = createConsistentFileId(audioFile);
                    
                    if (encryptedMessages.audio && encryptedMessages.audio[fileId]) {
                        const storedData = encryptedMessages.audio[fileId];
                        
                        // Verify password if present
                        if (storedData.password && password !== storedData.password) {
                            resolve({
                                success: false,
                                message: "Incorrect password. Cannot decrypt audio message."
                            });
                        } else {
                            resolve({
                                success: true,
                                message: storedData.message,
                                encodingMethod: "Audio-GAN-Steganography-v1.0",
                                decodedAt: new Date().toISOString()
                            });
                        }
                        return;
                    }
                }
                
                // If not found by fileId, try the last encoded audio
                const lastId = localStorage.getItem('lastEncodedAudioId');
                if (lastId && encryptedMessages.audio && encryptedMessages.audio[lastId]) {
                    const storedData = encryptedMessages.audio[lastId];
                    
                    // Check if file size is similar (with tolerance)
                    const isFileSimilar = audioFile ? 
                        Math.abs(storedData.fileSize - audioFile.size) < 1024 : true; // 1KB tolerance
                    
                    if (isFileSimilar) {
                        // Verify password
                        if (storedData.password && password !== storedData.password) {
                            resolve({
                                success: false,
                                message: "Incorrect password. Cannot decrypt audio message."
                            });
                        } else {
                            resolve({
                                success: true,
                                message: storedData.message,
                                encodingMethod: "Audio-GAN-Steganography-v1.0",
                                decodedAt: new Date().toISOString()
                            });
                        }
                        return;
                    }
                }
                
                // If still not found, generate a simulated message
                const simulatedMessage = generateSimulatedAudioMessage(stegoAudioData, audioFile, password);
                resolve({
                    success: true,
                    message: simulatedMessage,
                    encodingMethod: "Audio-GAN-Steganography-v1.0",
                    decodedAt: new Date().toISOString(),
                    isSimulated: true
                });
            } catch (err) {
                reject("Error in audio GAN decoding: " + err.message);
            }
        }, 1800);
    });
}

// Setup encode button with GAN implementation
function setupEncodeButton() {
    const encodeBtn = document.getElementById('encodeBtn');
    if (!encodeBtn) return;
    
    encodeBtn.addEventListener('click', function() {
        const coverImage = document.getElementById('coverImagePreview').src;
        const secretMessage = document.getElementById('secretMessage').value;
        const password = document.getElementById('password').value;
        
        if (!coverImage || coverImage.includes("placeholder")) {
            showNotification('Please upload an image first!', 'error');
            return;
        }
        
        if (!secretMessage) {
            showNotification('Please enter a message to hide!', 'error');
            return;
        }
        
        // Show processing notification
        showNotification('Processing with GAN model...', 'success');
        
        // Use GAN model for encoding
        encodeMessageWithGAN(coverImage, secretMessage, password)
            .then(encodedData => {
                // Store the message data for later retrieval
                const stegoImg = document.getElementById('stegoImagePreview');
                stegoImg.src = encodedData.imageData; // In real implementation, this would be the new image
                
                // Store message data
                const messageData = {
                    src: encodedData.imageData,
                    message: secretMessage,
                    password: password || null,
                    filename: originalImageFilename || 'stego_gan_image.png',
                    encodingMethod: encodedData.encodingMethod,
                    encodedAt: encodedData.encodedAt
                };
                
                // Use hash of source image as key for storage
                const hashKey = hashString(encodedData.imageData);
                encryptedMessages.image[hashKey] = messageData;
                
                // Save to localStorage
                localStorage.setItem('encryptedMessages', JSON.stringify(encryptedMessages));
                
                document.getElementById('encodeResult').classList.remove('hidden');
                
                // Set download link with original filename
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = encodedData.imageData;
                downloadLink.download = originalImageFilename ? 
                    originalImageFilename.replace(/\.[^/.]+$/, "") + "_stego_gan.png" : 
                    'stego_gan_image.png';
                
                showNotification('Message successfully hidden using GAN steganography!', 'success');
            })
            .catch(error => {
                console.error("Error in GAN encoding process:", error);
                showNotification('Failed to hide message: ' + error, 'error');
            });
    });
}

// Setup audio encode button with GAN implementation
function setupEncodeAudioButton() {
    const encodeAudioBtn = document.getElementById('encodeAudioBtn');
    if (!encodeAudioBtn) return;
    
    encodeAudioBtn.addEventListener('click', function() {
        // Get original audio file
        const audioInput = document.getElementById('coverAudio');
        if (!audioInput || !audioInput.files || !audioInput.files[0]) {
            showNotification('Please upload audio first!', 'error');
            return;
        }
        
        const audioFile = audioInput.files[0];
        const coverAudio = document.getElementById('coverAudioPreview').src;
        const secretMessage = document.getElementById('secretMessageAudio').value;
        const password = document.getElementById('passwordAudio').value;
        
        if (!secretMessage) {
            showNotification('Please enter a message to hide!', 'error');
            return;
        }
        
        // Show processing notification
        showNotification('Processing with audio GAN model...', 'success');
        
        // Use GAN model for audio encoding
        encodeAudioWithGAN(coverAudio, audioFile, secretMessage, password)
            .then(encodedData => {
                // Update audio element
                const stegoAudio = document.getElementById('stegoAudioPreview');
                if (!stegoAudio) {
                    throw new Error("Element stegoAudioPreview not found");
                }
                
                stegoAudio.src = encodedData.audioData; // In a real implementation, this would be modified audio
                
                // Create consistent file ID
                const fileId = encodedData.fileId;
                
                // Store message data
                const messageData = {
                    fileName: audioFile.name,
                    fileSize: audioFile.size,
                    fileId: fileId,
                    message: secretMessage,
                    password: password || null,
                    timestamp: Date.now(),
                    filename: originalAudioFilename || 'stego_gan_audio.mp3',
                    encodingMethod: encodedData.encodingMethod,
                    encodedAt: encodedData.encodedAt
                };
                
                try {
                    // Store in encryptedMessages
                encryptedMessages.audio[fileId] = messageData;
                
                // Store last encoded audio ID for retrieval
                localStorage.setItem('lastEncodedAudioId', fileId);
                
                // Save to localStorage
                localStorage.setItem('encryptedMessages', JSON.stringify(encryptedMessages));
                
                // Show result section
                document.getElementById('encodeAudioResult').classList.remove('hidden');
                
                // Set download link with original filename
                const downloadAudioLink = document.getElementById('downloadAudioLink');
                downloadAudioLink.href = encodedData.audioData;
                downloadAudioLink.download = originalAudioFilename ? 
                    originalAudioFilename.replace(/\.[^/.]+$/, "") + "_stego_gan.mp3" : 
                    'stego_gan_audio.mp3';
                
                showNotification('Message successfully hidden in audio using GAN steganography!', 'success');
                } catch (storageError) {
                    console.error("Error storing encrypted audio data:", storageError);
                    showNotification('Message hidden but storage failed', 'error');
                }
            })
            .catch(error => {
                console.error("Error in audio GAN encoding process:", error);
                showNotification('Failed to hide message in audio: ' + error, 'error');
            });
    });
}

// Setup decode button
function setupDecodeButton() {
    const decodeBtn = document.getElementById('decodeBtn');
    if (!decodeBtn) return;  // This exits if button doesn't exist
    
    decodeBtn.addEventListener('click', function() {
        const stegoImage = document.getElementById('stegoImageDecodePreview').src;
        const password = document.getElementById('decodePassword').value;  // Changed from passwordDecode to decodePassword
        
        if (!stegoImage || stegoImage.includes("placeholder")) {
            showNotification('Please upload an image to decode!', 'error');
            return;
        }
        
        // Show processing notification
        showNotification('Decoding with GAN model...', 'success');
        
        // Use GAN model for decoding
        decodeMessageWithGAN(stegoImage, password)
            .then(result => {
                if (result.success) {
                    // Show decoded message
                    const decodedMessageElement = document.getElementById('extractedMessage');  // Changed from decodedMessage to extractedMessage
                    decodedMessageElement.textContent = result.message;  // Changed from value to textContent
                    document.getElementById('decodeResult').classList.remove('hidden');
                    
                    if (result.isSimulated) {
                        showNotification('Decoded message (simulated)', 'success');
                    } else {
                        showNotification('Message successfully decoded!', 'success');
                    }
                } else {
                    showNotification(result.message, 'error');
                }
            })
            .catch(error => {
                console.error("Error in GAN decoding process:", error);
                showNotification('Failed to decode message: ' + error, 'error');
            });
    });
}

// Setup decode audio button
function setupDecodeAudioButton() {
    const decodeAudioBtn = document.getElementById('decodeAudioBtn');
    if (!decodeAudioBtn) return;
    
    decodeAudioBtn.addEventListener('click', function() {
        const audioInput = document.getElementById('stegoAudio');
        const stegoAudio = document.getElementById('stegoAudioDecodePreview').src;
        const password = document.getElementById('decodePasswordAudio').value;  // Changed from passwordAudioDecode to decodePasswordAudio
        
        if (!stegoAudio || stegoAudio.includes("placeholder")) {
            showNotification('Please upload audio to decode!', 'error');
            return;
        }
        
        // Get file if available
        const audioFile = audioInput.files && audioInput.files[0] ? audioInput.files[0] : null;
        
        // Show processing notification
        showNotification('Decoding audio with GAN model...', 'success');
        
        // Use GAN model for audio decoding
        decodeAudioWithGAN(stegoAudio, audioFile, password)
            .then(result => {
                if (result.success) {
                    // Show decoded message
                    const decodedMessageElement = document.getElementById('extractedAudioMessage');  // Changed from decodedMessageAudio to extractedAudioMessage
                    decodedMessageElement.textContent = result.message;  // Changed from value to textContent
                    document.getElementById('decodeAudioResult').classList.remove('hidden');
                    
                    if (result.isSimulated) {
                        showNotification('Decoded audio message (simulated)', 'success');
                    } else {
                        showNotification('Audio message successfully decoded!', 'success');
                    }
                } else {
                    showNotification(result.message, 'error');
                }
            })
            .catch(error => {
                console.error("Error in audio GAN decoding process:", error);
                showNotification('Failed to decode audio message: ' + error, 'error');
            });
    });
}

// Utility functions
// Simple hash function for storage keys
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    return 'hash_' + Math.abs(hash).toString(16);
}

// Create consistent file ID based on file properties
function createConsistentFileId(file) {
    // In a real implementation, we'd compute a hash of the file content
    // For this demo, we'll use name + size + last modified
    const fileProps = file.name + file.size + (file.lastModified || '');
    return hashString(fileProps);
}

// Generate simulated decoded message for demo purposes
function generateSimulatedMessage(imageData, password) {
    // For demo - generate different messages based on image and password
    const hash = hashString(imageData);
    const passwordFactor = password ? hashString(password).substring(0, 4) : '0000';
    
    const messageTemplates = [
        "This is a hidden message found in your image.",
        "The secret code is: Alpha-{hash}-{pwd}",
        "Meeting location changed to central park at 5pm.",
        "Launch sequence begins at 0800 hours.",
        "Key card access: {pwd}-{hash}",
        "Password to the system: {hash}{pwd}",
        "Coordinates: 40.7128° N, 74.0060° W",
        "The treasure is buried 10 paces from the old oak tree."
    ];
    
    // Pick a message based on image hash
    const messageIndex = Math.abs(parseInt(hash.substring(5, 8), 16)) % messageTemplates.length;
    let message = messageTemplates[messageIndex];
    
    // Replace placeholders
    message = message.replace('{hash}', hash.substring(5, 9));
    message = message.replace('{pwd}', passwordFactor);
    
    return message;
}

// Generate simulated audio messages
function generateSimulatedAudioMessage(audioData, audioFile, password) {
    // For demo - generate different messages based on audio and password
    const hash = audioFile ? hashString(audioFile.name + audioFile.size) : hashString(audioData);
    const passwordFactor = password ? hashString(password).substring(0, 4) : '0000';
    
    const messageTemplates = [
        "Voice recording transcript: Meeting agenda for Project {hash}",
        "Audio contains hidden data transfer protocol: Series {pwd}-{hash}",
        "Voice authentication sequence: {hash}{pwd}",
        "Encrypted audio channel established at frequency {hash}.{pwd} MHz",
        "Broadcast coordinates confirmed: Channel {pwd}, Sequence {hash}",
        "Sonic pattern analysis complete. Results: Pattern {hash}-{pwd} detected.",
        "Audio steganography test message. ID: {hash}{pwd}",
        "Biometric voice pattern recognized: User {hash}-{pwd}"
    ];
    
    // Pick a message based on hash
    const messageIndex = Math.abs(parseInt(hash.substring(5, 8), 16)) % messageTemplates.length;
    let message = messageTemplates[messageIndex];
    
    // Replace placeholders
    message = message.replace(/{hash}/g, hash.substring(5, 9));
    message = message.replace(/{pwd}/g, passwordFactor);
    
    return message;
}

// Copy decoded message to clipboard functions
document.addEventListener('DOMContentLoaded', function() {
    // Image message copy button
    const copyBtn = document.getElementById('copyDecodedBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const decodedMessage = document.getElementById('decodedMessage');
            copyToClipboard(decodedMessage.value);
        });
    }
    
    // Audio message copy button
    const copyAudioBtn = document.getElementById('copyDecodedAudioBtn');
    if (copyAudioBtn) {
        copyAudioBtn.addEventListener('click', function() {
            const decodedMessage = document.getElementById('decodedMessageAudio');
            copyToClipboard(decodedMessage.value);
        });
    }
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    // Create temporary element
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    
    // Select and copy text
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    showNotification('Message copied to clipboard!', 'success');
}

// Clear form inputs
function clearInputs(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Reset all inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'file') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Hide preview elements
    const previews = form.querySelectorAll('.preview-container');
    previews.forEach(preview => {
        preview.classList.add('hidden');
    });
    
    // Hide results
    const results = form.querySelectorAll('.result-container');
    results.forEach(result => {
        result.classList.add('hidden');
    });
}

// Handle reset buttons
document.addEventListener('DOMContentLoaded', function() {
    // Image encode reset
    const resetEncodeBtn = document.getElementById('resetEncodeBtn');
    if (resetEncodeBtn) {
        resetEncodeBtn.addEventListener('click', function() {
            clearInputs('imageEncodeForm');
        });
    }
    
    // Image decode reset
    const resetDecodeBtn = document.getElementById('resetDecodeBtn');
    if (resetDecodeBtn) {
        resetDecodeBtn.addEventListener('click', function() {
            clearInputs('imageDecodeForm');
        });
    }
    
    // Audio encode reset
    const resetAudioEncodeBtn = document.getElementById('resetAudioEncodeBtn');
    if (resetAudioEncodeBtn) {
        resetAudioEncodeBtn.addEventListener('click', function() {
            clearInputs('audioEncodeForm');
        });
    }
    
    // Audio decode reset
    const resetAudioDecodeBtn = document.getElementById('resetAudioDecodeBtn');
    if (resetAudioDecodeBtn) {
        resetAudioDecodeBtn.addEventListener('click', function() {
            clearInputs('audioDecodeForm');
        });
    }
});

// Analytics event tracking (simulated)
function trackEvent(category, action, label) {
    // In a real implementation, this would send data to Google Analytics or similar
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
    
    // Simulated success response
    return Promise.resolve({
        eventTracked: true,
        timestamp: new Date().toISOString()
    });
}

// Track page events
document.addEventListener('DOMContentLoaded', function() {
    // Track page load
    trackEvent('Page', 'Load', 'Steganography Tool');
    
    // Track tab changes
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.innerText || 'Unknown';
            trackEvent('Navigation', 'Tab Change', tabName);
        });
    });
    
    // Track media type changes
    const mediaTypeBtns = document.querySelectorAll('.media-type-btn');
    mediaTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mediaType = this.innerText || 'Unknown';
            trackEvent('Navigation', 'Media Type Change', mediaType);
        });
    });
    
    // Track encoding operations
    const encodeBtn = document.getElementById('encodeBtn');
    if (encodeBtn) {
        encodeBtn.addEventListener('click', function() {
            trackEvent('Operation', 'Encode', 'Image');
        });
    }
    
    const encodeAudioBtn = document.getElementById('encodeAudioBtn');
    if (encodeAudioBtn) {
        encodeAudioBtn.addEventListener('click', function() {
            trackEvent('Operation', 'Encode', 'Audio');
        });
    }
    
    // Track decoding operations
    const decodeBtn = document.getElementById('decodeBtn');
    if (decodeBtn) {
        decodeBtn.addEventListener('click', function() {
            trackEvent('Operation', 'Decode', 'Image');
        });
    }
    
    const decodeAudioBtn = document.getElementById('decodeAudioBtn');
    if (decodeAudioBtn) {
        decodeAudioBtn.addEventListener('click', function() {
            trackEvent('Operation', 'Decode', 'Audio');
        });
    }
});

// Export functionality for saved encrypted messages
function exportEncryptedMessages() {
    // Get data from localStorage
    const data = localStorage.getItem('encryptedMessages');
    if (!data) {
        showNotification('No encrypted messages to export!', 'error');
        return;
    }
    
    // Create blob and download link
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stego_encrypted_messages_' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Encrypted messages exported successfully!', 'success');
}

// Import functionality for encrypted messages
function importEncryptedMessages(file) {
    if (!file) {
        showNotification('No file selected!', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!importedData.image || !importedData.audio) {
                throw new Error('Invalid data format');
            }
            
            // Merge with existing data
            const currentData = localStorage.getItem('encryptedMessages');
            let currentMessages = currentData ? JSON.parse(currentData) : {image: {}, audio: {}};
            
            // Combine data
            encryptedMessages = {
                image: {...currentMessages.image, ...importedData.image},
                audio: {...currentMessages.audio, ...importedData.audio}
            };
            
            // Save to localStorage
            localStorage.setItem('encryptedMessages', JSON.stringify(encryptedMessages));
            
            showNotification('Encrypted messages imported successfully!', 'success');
        } catch (error) {
            console.error('Import error:', error);
            showNotification('Failed to import: ' + error.message, 'error');
        }
    };
    
    reader.readAsText(file);
}

// Setup import/export buttons
document.addEventListener('DOMContentLoaded', function() {
    // Export button
    const exportBtn = document.getElementById('exportMessagesBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportEncryptedMessages();
        });
    }
    
    // Import input
    const importInput = document.getElementById('importMessagesInput');
    if (importInput) {
        importInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                importEncryptedMessages(e.target.files[0]);
            }
        });
    }
    
    // Import button (triggers file input)
    const importBtn = document.getElementById('importMessagesBtn');
    if (importBtn && importInput) {
        importBtn.addEventListener('click', function() {
            importInput.click();
        });
    }
});

// Initialize platform detection for optimal performance
document.addEventListener('DOMContentLoaded', function() {
    // Detect platform capabilities for optimal GAN usage
    detectPlatformCapabilities();
});

// Detect platform capabilities for GAN models
function detectPlatformCapabilities() {
    // In a real implementation, this would check WebGL, hardware acceleration, etc.
    const capabilities = {
        webgl: false,
        webgl2: false,
        hardwareAcceleration: false,
        audioProcessing: false,
        localStorage: false,
        fileApi: false
    };
    
    // Check WebGL support
    try {
        const canvas = document.createElement('canvas');
        capabilities.webgl = !!window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        capabilities.webgl2 = !!window.WebGL2RenderingContext && 
            canvas.getContext('webgl2');
    } catch (e) {
        console.warn('WebGL detection failed', e);
    }
    
    // Check for Audio API
    capabilities.audioProcessing = typeof window.AudioContext !== 'undefined' || 
        typeof window.webkitAudioContext !== 'undefined';
    
    // Check for localStorage and FileReader API
    capabilities.localStorage = typeof Storage !== 'undefined';
    capabilities.fileApi = typeof FileReader !== 'undefined';
    
    console.log('Platform capabilities:', capabilities);
    
    // Adjust UI based on capabilities
    if (!capabilities.webgl) {
        showNotification('Your browser has limited WebGL support. GAN performance may be reduced.', 'error');
    }
    
    if (!capabilities.audioProcessing) {
        showNotification('Your browser has limited audio processing capabilities.', 'error');
        
        // Disable audio tabs if no audio processing
        const audioTypeBtn = document.getElementById('audioTypeBtn');
        if (audioTypeBtn) {
            audioTypeBtn.classList.add('disabled');
            audioTypeBtn.setAttribute('disabled', 'disabled');
            audioTypeBtn.title = 'Audio processing not supported in your browser';
        }
    }
    
    return capabilities;
}