// Global variables
let currentStep = 1;
let selectedPlan = null;
let selectedBilling = 'monthly';

// Plan data
const plans = {
    basic: {
        name: 'Básico',
        monthly: 197,
        yearly: 158,
        features: [
            'Até 500 pacientes',
            '1 dentista',
            'Agendamento online',
            'Prontuário digital',
            'Relatórios básicos'
        ]
    },
    professional: {
        name: 'Profissional',
        monthly: 397,
        yearly: 318,
        features: [
            'Até 2.000 pacientes',
            'Até 5 dentistas',
            'Agendamento + SMS',
            'Prontuário completo',
            'Relatórios avançados',
            'App mobile'
        ]
    },
    enterprise: {
        name: 'Enterprise',
        monthly: 797,
        yearly: 638,
        features: [
            'Pacientes ilimitados',
            'Dentistas ilimitados',
            'Múltiplas unidades',
            'API personalizada',
            'Suporte prioritário',
            'Treinamento incluso'
        ]
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updatePlanPrices();
    setupFormValidation();
});

// Initialize event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Billing toggle
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            updatePlanPrices();
            updateBillingOptions();
        });
    }

    // Plan selection buttons
    document.querySelectorAll('.plan-select').forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.getAttribute('data-plan');
            selectPlan(planType);
            document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submission
    const clinicForm = document.getElementById('clinic-form');
    if (clinicForm) {
        clinicForm.addEventListener('submit', handleFormSubmission);
    }

    // Billing option change in registration
    document.querySelectorAll('input[name="billing"]').forEach(radio => {
        radio.addEventListener('change', function() {
            selectedBilling = this.value;
            updateRegistrationSummary();
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            this.reset();
        });
    }
}

// Update plan prices based on billing toggle
function updatePlanPrices() {
    const isYearly = document.getElementById('billing-toggle').checked;
    const billingOptions = document.querySelectorAll('.billing-option');
    
    // Update billing option active state
    billingOptions.forEach(option => {
        const billing = option.getAttribute('data-billing');
        if ((billing === 'yearly' && isYearly) || (billing === 'monthly' && !isYearly)) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update plan prices
    document.querySelectorAll('.monthly-price').forEach(priceElement => {
        const monthly = parseFloat(priceElement.getAttribute('data-monthly'));
        const yearly = parseFloat(priceElement.getAttribute('data-yearly'));
        const price = isYearly ? yearly : monthly;
        priceElement.textContent = price;
    });

    // Update period text
    document.querySelectorAll('.period').forEach(periodElement => {
        periodElement.textContent = isYearly ? '/mês' : '/mês';
    });
}

// Update billing options in form
function updateBillingOptions() {
    selectedBilling = document.getElementById('billing-toggle').checked ? 'yearly' : 'monthly';
    const radioButtons = document.querySelectorAll('input[name="billing"]');
    radioButtons.forEach(radio => {
        if (radio.value === selectedBilling) {
            radio.checked = true;
        }
    });
    updateRegistrationSummary();
}

// Select a plan
function selectPlan(planType) {
    selectedPlan = planType;
    showSelectedPlan();
    updateRegistrationSummary();
    
    // Show registration form
    const registrationSection = document.getElementById('register');
    if (registrationSection) {
        registrationSection.style.display = 'block';
    }
}

// Show selected plan in registration form
function showSelectedPlan() {
    if (!selectedPlan) return;
    
    const plan = plans[selectedPlan];
    const selectedPlanDisplay = document.getElementById('selected-plan-display');
    
    if (selectedPlanDisplay) {
        selectedPlanDisplay.innerHTML = `
            <h4>Plano ${plan.name}</h4>
            <ul>
                ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
        `;
    }
}

// Update registration summary
function updateRegistrationSummary() {
    if (!selectedPlan) return;
    
    const plan = plans[selectedPlan];
    const price = selectedBilling === 'yearly' ? plan.yearly : plan.monthly;
    const billingText = selectedBilling === 'yearly' ? 'Anual (20% desconto)' : 'Mensal';
    
    // Update total amount in step 2
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = price.toFixed(2).replace('.', ',');
    }
    
    // Update summary in step 3
    const summaryPlan = document.getElementById('summary-plan');
    const summaryBilling = document.getElementById('summary-billing');
    const summaryTotal = document.getElementById('summary-total');
    
    if (summaryPlan) summaryPlan.textContent = plan.name;
    if (summaryBilling) summaryBilling.textContent = billingText;
    if (summaryTotal) summaryTotal.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Form navigation
function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        updateFormStep();
        
        if (currentStep === 2) {
            showSelectedPlan();
            updateRegistrationSummary();
        }
    }
}

function prevStep() {
    currentStep--;
    updateFormStep();
}

function updateFormStep() {
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Form validation
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    // Specific validations
    if (currentStep === 1) {
        const cnpj = document.getElementById('cnpj').value;
        if (cnpj && !isValidCNPJ(cnpj)) {
            document.getElementById('cnpj').style.borderColor = '#ef4444';
            alert('Por favor, insira um CNPJ válido.');
            isValid = false;
        }
    }
    
    if (currentStep === 3) {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (cardNumber && !isValidCardNumber(cardNumber)) {
            document.getElementById('cardNumber').style.borderColor = '#ef4444';
            alert('Por favor, insira um número de cartão válido.');
            isValid = false;
        }
        
        if (expiryDate && !isValidExpiryDate(expiryDate)) {
            document.getElementById('expiryDate').style.borderColor = '#ef4444';
            alert('Por favor, insira uma data de validade válida.');
            isValid = false;
        }
        
        if (cvv && !isValidCVV(cvv)) {
            document.getElementById('cvv').style.borderColor = '#ef4444';
            alert('Por favor, insira um CVV válido.');
            isValid = false;
        }
    }
    
    return isValid;
}

// Setup form validation
function setupFormValidation() {
    // CNPJ formatting
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            this.value = formatCNPJ(this.value);
        });
    }
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            this.value = formatCardNumber(this.value);
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            this.value = formatExpiryDate(this.value);
        });
    }
    
    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

// Validation functions
function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    return cnpj.length === 14;
}

function isValidCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.length >= 13 && cleanNumber.length <= 19 && /^\d+$/.test(cleanNumber);
}

function isValidExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    
    return expiry > now;
}

function isValidCVV(cvv) {
    return cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
}

// Formatting functions
function formatCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    return cnpj;
}

function formatCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\s/g, '').replace(/\D/g, '');
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');
    return cardNumber.trim();
}

function formatExpiryDate(expiryDate) {
    expiryDate = expiryDate.replace(/\D/g, '');
    expiryDate = expiryDate.replace(/(\d{2})(\d)/, '$1/$2');
    return expiryDate;
}

// Form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Simulate payment processing
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Processando...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Get form data
        const formData = new FormData(e.target);
        const clinicData = Object.fromEntries(formData);
        
        // Show success modal
        showSuccessModal(clinicData);
        
        // Reset form
        e.target.reset();
        currentStep = 1;
        updateFormStep();
        selectedPlan = null;
        
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }, 2000);
}

// Show success modal
function showSuccessModal(clinicData) {
    const plan = plans[selectedPlan];
    const price = selectedBilling === 'yearly' ? plan.yearly : plan.monthly;
    const billingText = selectedBilling === 'yearly' ? 'Anual' : 'Mensal';
    
    document.getElementById('success-clinic').textContent = clinicData.tradeName || 'Sua Clínica';
    document.getElementById('success-plan').textContent = `${plan.name} - ${billingText}`;
    document.getElementById('success-amount').textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    
    document.getElementById('success-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Scroll animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card, .plan-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}