// DOM কন্টেন্ট লোড হওয়ার পর স্ক্রিপ্ট এক্সিকিউট হবে
document.addEventListener('DOMContentLoaded', function() {
    // মোবাইল মেনু টগল ফাংশন
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // জেলা, থানা এবং ইউনিয়ন সিলেক্ট ডাইনামিকভাবে পপুলেট করি
    const districtSelect = document.getElementById('district');
    const thanaSelect = document.getElementById('thana');
    const unionSelect = document.getElementById('union');
    
    // বাংলাদেশের জেলা, থানা এবং ইউনিয়ন ডাটা
    const locationData = {
        'dhaka': {
            thanas: ['ডেমরা', 'ধানমন্ডি', 'মতিঝিল', 'রমনা', 'সূত্রাপুর'],
            unions: ['ডেমরা ইউনিয়ন', 'ধানমন্ডি ইউনিয়ন', 'মতিঝিল ইউনিয়ন', 'রমনা ইউনিয়ন', 'সূত্রাপুর ইউনিয়ন']
        },
        'chittagong': {
            thanas: ['কোতোয়ালী', 'ডবলমুরিং', 'পাহাড়তলী', 'বন্দর'],
            unions: ['কোতোয়ালী ইউনিয়ন', 'ডবলমুরিং ইউনিয়ন', 'পাহাড়তলী ইউনিয়ন', 'বন্দর ইউনিয়ন']
        }
        // অন্যান্য জেলার ডাটা এখানে যোগ করুন
    };

    // জেলা সিলেক্ট চেঞ্জ ইভেন্ট
    if(districtSelect && thanaSelect && unionSelect) {
        districtSelect.addEventListener('change', function() {
            const selectedDistrict = this.value;
            
            // থানা ড্রপডাউন ক্লিয়ার এবং ডিসেবল করুন
            thanaSelect.innerHTML = '<option value="">থানা নির্বাচন করুন</option>';
            thanaSelect.disabled = !selectedDistrict;
            
            // ইউনিয়ন ড্রপডাউন ক্লিয়ার এবং ডিসেবল করুন
            unionSelect.innerHTML = '<option value="">ইউনিয়ন নির্বাচন করুন</option>';
            unionSelect.disabled = true;
            
            if(selectedDistrict && locationData[selectedDistrict]) {
                // থানা ড্রপডাউন পপুলেট করুন
                locationData[selectedDistrict].thanas.forEach(thana => {
                    const option = document.createElement('option');
                    option.value = thana;
                    option.textContent = thana;
                    thanaSelect.appendChild(option);
                });
                
                thanaSelect.disabled = false;
            }
        });
        
        // থানা সিলেক্ট চেঞ্জ ইভেন্ট
        thanaSelect.addEventListener('change', function() {
            const selectedDistrict = districtSelect.value;
            const selectedThana = this.value;
            
            // ইউনিয়ন ড্রপডাউন ক্লিয়ার এবং ডিসেবল করুন
            unionSelect.innerHTML = '<option value="">ইউনিয়ন নির্বাচন করুন</option>';
            unionSelect.disabled = !selectedThana;
            
            if(selectedDistrict && selectedThana && locationData[selectedDistrict]) {
                // ইউনিয়ন ড্রপডাউন পপুলেট করুন (সব ইউনিয়ন দেখাচ্ছি উদাহরণ স্বরূপ)
                locationData[selectedDistrict].unions.forEach(union => {
                    const option = document.createElement('option');
                    option.value = union;
                    option.textContent = union;
                    unionSelect.appendChild(option);
                });
                
                unionSelect.disabled = false;
            }
        });
    }

    // রক্তদাতা রেজিস্ট্রেশন ফর্ম সাবমিট
    const donorForm = document.getElementById('donorRegistration');
    if(donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ফর্ম ডাটা কালেক্ট করুন
            const formData = {
                name: document.getElementById('donorName').value,
                phone: document.getElementById('donorPhone').value,
                email: document.getElementById('donorEmail').value,
                bloodGroup: document.getElementById('bloodGroup').value,
                district: document.getElementById('district').value,
                thana: document.getElementById('thana').value,
                union: document.getElementById('union').value
            };
            
            // ভ্যালিডেশন চেক করুন
            if(!formData.name || !formData.phone || !formData.bloodGroup || !formData.district || !formData.thana || !formData.union) {
                alert('দয়া করে সকল প্রয়োজনীয় তথ্য প্রদান করুন');
                return;
            }
            
            // ফোন নম্বর ভ্যালিডেশন
            if(!/^(?:\+88|01)?\d{11}$/.test(formData.phone)) {
                alert('দয়া করে একটি বৈধ মোবাইল নম্বর প্রদান করুন');
                return;
            }
            
            // এখানে আপনি AJAX রিকুয়েস্ট বা অন্য কোন মেথডে ডাটা সার্ভারে সাবমিট করতে পারেন
            console.log('রক্তদাতা রেজিস্ট্রেশন ডাটা:', formData);
            
            // সাকসেস মেসেজ দেখান
            alert('ধন্যবাদ! আপনার রক্তদাতা রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে।');
            donorForm.reset();
            
            // ড্যাশবোর্ড কাউন্টার আপডেট করুন
            updateDashboardCounters();
        });
    }

    // রক্ত প্রয়োজন ফর্ম সাবমিট
    const bloodRequestForm = document.getElementById('bloodRequestForm');
    if(bloodRequestForm) {
        bloodRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ফর্ম ডাটা কালেক্ট করুন
            const formData = {
                patientName: document.getElementById('patientName').value,
                contactNumber: document.getElementById('contactNumber').value,
                fullAddress: document.getElementById('fullAddress').value,
                requiredBloodGroup: document.getElementById('requiredBloodGroup').value,
                hospitalName: document.getElementById('hospitalName').value,
                requiredDate: document.getElementById('requiredDate').value,
                additionalInfo: document.getElementById('additionalInfo').value
            };
            
            // ভ্যালিডেশন চেক করুন
            if(!formData.patientName || !formData.contactNumber || !formData.fullAddress || 
               !formData.requiredBloodGroup || !formData.hospitalName || !formData.requiredDate) {
                alert('দয়া করে সকল প্রয়োজনীয় তথ্য প্রদান করুন');
                return;
            }
            
            // ফোন নম্বর ভ্যালিডেশন
            if(!/^(?:\+88|01)?\d{11}$/.test(formData.contactNumber)) {
                alert('দয়া করে একটি বৈধ মোবাইল নম্বর প্রদান করুন');
                return;
            }
            
            // তারিখ ভ্যালিডেশন (আজকের তারিখ বা ভবিষ্যতের তারিখ হতে হবে)
            const today = new Date();
            const selectedDate = new Date(formData.requiredDate);
            
            if(selectedDate < today) {
                alert('দয়া করে আজকের তারিখ বা ভবিষ্যতের তারিখ নির্বাচন করুন');
                return;
            }
            
            // এখানে আপনি AJAX রিকুয়েস্ট বা অন্য কোন মেথডে ডাটা সার্ভারে সাবমিট করতে পারেন
            console.log('রক্ত প্রয়োজন অনুরোধ ডাটা:', formData);
            
            // সাকসেস মেসেজ দেখান
            alert('আপনার রক্তের প্রয়োজনীয়তা সফলভাবে জমা দেওয়া হয়েছে। শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।');
            bloodRequestForm.reset();
            
            // ড্যাশবোর্ড কাউন্টার আপডেট করুন
            updateDashboardCounters();
        });
    }

    // রক্তদাতা খুঁজুন ফাংশনালিটি
    const searchBtn = document.getElementById('searchBtn');
    if(searchBtn) {
        searchBtn.addEventListener('click', function() {
            const bloodGroup = document.getElementById('searchBloodGroup').value;
            const district = document.getElementById('searchDistrict').value;
            
            // এখানে সার্চ লজিক ইমপ্লিমেন্ট করুন
            searchDonors(bloodGroup, district);
        });
    }

    // ড্যাশবোর্ড কাউন্টার আপডেট ফাংশন
    function updateDashboardCounters() {
        // এখানে আপনি AJAX কল করে রিয়েল-টাইম ডাটা পেতে পারেন
        // উদাহরণ স্বরূপ আমরা র্যান্ডমভাবে কিছু সংখ্যা দেখাচ্ছি
        
        const totalDonors = document.getElementById('total-donors');
        const totalDonations = document.getElementById('total-donations');
        const totalAreas = document.getElementById('total-areas');
        const urgentRequests = document.getElementById('urgent-requests');
        
        if(totalDonors) {
            const current = parseInt(totalDonors.textContent.replace(/,/g, ''));
            totalDonors.textContent = (current + 1).toLocaleString();
        }
        
        if(urgentRequests) {
            const current = parseInt(urgentRequests.textContent);
            urgentRequests.textContent = current + 1;
        }
    }

    // রক্তদাতা সার্চ ফাংশন (ডেমো ডাটা)
    function searchDonors(bloodGroup, district) {
        const donorList = document.querySelector('.donor-list');
        if(!donorList) return;
        
        // লোডিং স্টেট দেখান
        donorList.innerHTML = '<p class="loading">রক্তদাতা খোঁজা হচ্ছে...</p>';
        
        // সিমুলেটেড AJAX রিকুয়েস্ট
        setTimeout(() => {
            // ডেমো ডাটা - বাস্তবে এটি সার্ভার থেকে আসবে
            const demoDonors = [
                {
                    name: 'আহমেদ রহমান',
                    bloodGroup: 'A+',
                    district: 'ঢাকা',
                    thana: 'ধানমন্ডি',
                    lastDonation: '৩ মাস আগে',
                    phone: '01XXXXXXXX'
                },
                {
                    name: 'সুমাইয়া আক্তার',
                    bloodGroup: 'B+',
                    district: 'ঢাকা',
                    thana: 'মতিঝিল',
                    lastDonation: '৫ মাস আগে',
                    phone: '01XXXXXXXX'
                },
                {
                    name: 'রফিকুল ইসলাম',
                    bloodGroup: 'O+',
                    district: 'চট্টগ্রাম',
                    thana: 'কোতোয়ালী',
                    lastDonation: '২ মাস আগে',
                    phone: '01XXXXXXXX'
                }
            ];
            
            // ফিল্টার প্রয়োগ করুন
            let filteredDonors = demoDonors;
            
            if(bloodGroup) {
                filteredDonors = filteredDonors.filter(donor => donor.bloodGroup === bloodGroup);
            }
            
            if(district) {
                filteredDonors = filteredDonors.filter(donor => donor.district === district);
            }
            
            // রেজাল্ট দেখান
            if(filteredDonors.length === 0) {
                donorList.innerHTML = '<p class="no-result">কোন রক্তদাতা পাওয়া যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</p>';
                return;
            }
            
            donorList.innerHTML = '';
            
            filteredDonors.forEach(donor => {
                const donorCard = document.createElement('div');
                donorCard.className = 'donor-card';
                
                donorCard.innerHTML = `
                    <h3>${donor.name}</h3>
                    <p><strong>রক্তের গ্রুপ:</strong> <span class="blood-${donor.bloodGroup.replace('+', 'plus').replace('-', 'minus')}">${donor.bloodGroup}</span></p>
                    <p><strong>জেলা:</strong> ${donor.district}</p>
                    <p><strong>থানা:</strong> ${donor.thana}</p>
                    <p><strong>যোগাযোগ:</strong> ${donor.phone}</p>
                    <p><strong>সর্বশেষ দান:</strong> ${donor.lastDonation}</p>
                `;
                
                donorList.appendChild(donorCard);
            });
        }, 1000);
    }

    // কমেন্ট সাবমিট ফাংশনালিটি
    const commentForm = document.getElementById('commentForm');
    if(commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const commentInput = this.querySelector('textarea');
            
            if(!nameInput.value || !commentInput.value) {
                alert('দয়া করে আপনার নাম এবং মতামত লিখুন');
                return;
            }
            
            addComment(nameInput.value, commentInput.value);
            
            // ফর্ম রিসেট করুন
            nameInput.value = '';
            commentInput.value = '';
        });
    }

    // নতুন কমেন্ট যোগ করার ফাংশন
    function addComment(name, comment) {
        const commentList = document.querySelector('.comment-list');
        if(!commentList) return;
        
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('bn-BD', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        commentDiv.innerHTML = `
            <h4>${name}</h4>
            <p class="comment-date">${dateString}</p>
            <p class="comment-text">${comment}</p>
        `;
        
        // নতুন কমেন্টকে লিস্টের শুরুতে যোগ করুন
        if(commentList.firstChild) {
            commentList.insertBefore(commentDiv, commentList.firstChild);
        } else {
            commentList.appendChild(commentDiv);
        }
    }

    // কন্টাক্ট ফর্ম সাবমিট
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };
            
            if(!formData.name || !formData.message || (!formData.email && !formData.phone)) {
                alert('দয়া করে আপনার নাম, যোগাযোগের তথ্য (ইমেইল বা ফোন) এবং বার্তা লিখুন');
                return;
            }
            
            // এখানে AJAX রিকুয়েস্ট বা অন্য কোন মেথডে ডাটা সার্ভারে সাবমিট করতে পারেন
            console.log('যোগাযোগ ফর্ম ডাটা:', formData);
            
            alert('ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            contactForm.reset();
        });
    }
});
