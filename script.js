document.addEventListener('DOMContentLoaded', function() {
    // প্রোফাইল ড্রপডাউন মেনু
    const profileDropdown = document.querySelector('.user-profile');
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    dropdownMenu.innerHTML = `
        <a href="#"><i class="fas fa-user"></i> প্রোফাইল</a>
        <a href="#"><i class="fas fa-cog"></i> সেটিংস</a>
        <a href="#"><i class="fas fa-sign-out-alt"></i> লগ আউট</a>
    `;
    profileDropdown.appendChild(dropdownMenu);
    
    profileDropdown.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // মোবাইল ভিউ জন্য সাইডবার টগল বাটন
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.user-header').prepend(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // রক্তদান অনুরোধ বাটন হ্যান্ডলিং
    const acceptButtons = document.querySelectorAll('.accept-btn');
    acceptButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const requestItem = this.closest('.request-item');
            
            // কনফার্মেশন ডায়ালগ
            if(confirm('আপনি কি এই রক্তদান অনুরোধ গ্রহণ করতে চান?')) {
                requestItem.classList.add('accepted');
                this.textContent = 'গ্রহণ করা হয়েছে';
                this.style.backgroundColor = '#4CAF50';
                
                // নোটিফিকেশন কাউন্ট আপডেট
                const notificationBadge = document.querySelector('.notification-badge');
                if(notificationBadge) {
                    const currentCount = parseInt(notificationBadge.textContent);
                    if(currentCount > 0) {
                        notificationBadge.textContent = currentCount - 1;
                    }
                }
                
                // ড্যাশবোর্ড কার্ড আপডেট
                updateDonationCount();
            }
        });
    });

    // রক্তদান কাউন্ট আপডেট ফাংশন
    function updateDonationCount() {
        const donationCard = document.querySelector('.donation-card h3');
        if(donationCard) {
            const currentCount = parseInt(donationCard.textContent);
            donationCard.textContent = currentCount + 1;
        }
    }

    // টেবিল সর্টিং ফাংশনালিটি
    const tableHeaders = document.querySelectorAll('.history-table th');
    tableHeaders.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });

    function sortTable(columnIndex) {
        const table = document.querySelector('.history-table table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();
            
            // তারিখ সর্টিং এর জন্য বিশেষ হ্যান্ডলিং
            if(columnIndex === 0) {
                return new Date(aText) - new Date(bText);
            }
            return aText.localeCompare(bText);
        });
        
        // টেবিল রিঅর্ডার
        rows.forEach(row => tbody.appendChild(row));
    }

    // ড্যাশবোর্ড কার্ড এনিমেশন
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
    });

    // রক্তদান ইতিহাস পেজিনেশন
    const historyRows = document.querySelectorAll('.history-table tbody tr');
    const rowsPerPage = 5;
    let currentPage = 1;
    
    function showPage(page) {
        historyRows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });
    }
    
    // যদি ৫ সারির বেশি হয় তাহলে পেজিনেশন যোগ করবে
    if(historyRows.length > rowsPerPage) {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';
        
        const pageCount = Math.ceil(historyRows.length / rowsPerPage);
        
        for(let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if(i === 1) pageBtn.className = 'active';
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                document.querySelectorAll('.pagination button').forEach(btn => {
                    btn.classList.remove('active');
                });
                pageBtn.classList.add('active');
            });
            paginationDiv.appendChild(pageBtn);
        }
        
        document.querySelector('.history-table').appendChild(paginationDiv);
        showPage(1);
    }

    // ডার্ক মোড টগল
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelector('.user-profile').appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // পেইজ লোডে ডার্ক মোড চেক
    if(localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});
