document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sistema de construção de instrumento
    const builderSteps = document.querySelectorAll('.builder-step');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    let currentStep = 0;
    
    // Inicializa o primeiro passo
    showStep(currentStep);
    
    // Configura os botões de navegação
    prevBtn.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentStep < builderSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });
    
    function showStep(stepIndex) {
        // Esconde todos os passos
        builderSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostra o passo atual
        builderSteps[stepIndex].classList.add('active');
        
        // Atualiza os botões de navegação
        prevBtn.disabled = stepIndex === 0;
        
        if (stepIndex === builderSteps.length - 1) {
            nextBtn.style.display = 'none';
            updateSummary();
        } else {
            nextBtn.style.display = 'inline-block';
            nextBtn.textContent = stepIndex === builderSteps.length - 2 ? 'Finalizar' : 'Próximo';
        }
    }
    
    // Seleção de opções
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove a seleção de outros cards no mesmo grupo
            const parent = this.parentElement;
            parent.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Seleciona o card clicado
            this.classList.add('selected');
            
            // Atualiza a pré-visualização
            updatePreview();
        });
    });
    
    // Seleção de acessórios
    const accessoryCheckboxes = document.querySelectorAll('.accessories-list input[type="checkbox"]');
    accessoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePreview);
    });
    
    // Atualiza a pré-visualização
    function updatePreview() {
        const previewList = document.getElementById('preview-details-list');
        previewList.innerHTML = '';
        
        let totalPrice = 0;
        
        // Modelo selecionado
        const selectedModel = document.querySelector('#step-modelo .option-card.selected');
        if (selectedModel) {
            const modelName = selectedModel.querySelector('h4').textContent;
            const modelPrice = parseFloat(selectedModel.dataset.price);
            
            previewList.innerHTML += `<li><strong>Modelo:</strong> ${modelName}</li>`;
            totalPrice += modelPrice;
            
            // Atualiza a imagem de pré-visualização
            const previewImg = selectedModel.querySelector('img').src;
            document.getElementById('instrument-preview').src = previewImg;
        }
        
        // Madeira selecionada
        const selectedWood = document.querySelector('#step-madeira .option-card.selected');
        if (selectedWood) {
            const woodName = selectedWood.querySelector('h4').textContent;
            const woodPrice = parseFloat(selectedWood.dataset.price);
            
            previewList.innerHTML += `<li><strong>Madeira:</strong> ${woodName}</li>`;
            totalPrice += woodPrice;
        }
        
        // Acessórios selecionados
        const selectedAccessories = [];
        document.querySelectorAll('.accessories-list input[type="checkbox"]:checked').forEach(checkbox => {
            const accessoryName = checkbox.nextElementSibling.textContent.replace(/\(\+ R\$\ \d+\)/, '').trim();
            const accessoryPrice = parseFloat(checkbox.dataset.price);
            
            selectedAccessories.push(accessoryName);
            totalPrice += accessoryPrice;
        });
        
        if (selectedAccessories.length > 0) {
            previewList.innerHTML += `<li><strong>Acessórios:</strong> ${selectedAccessories.join(', ')}</li>`;
        } else {
            previewList.innerHTML += `<li><strong>Acessórios:</strong> Nenhum selecionado</li>`;
        }
        
        // Atualiza o preço total
        document.getElementById('preview-price').textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }
    
    // Atualiza o resumo
    function updateSummary() {
        const selectedModel = document.querySelector('#step-modelo .option-card.selected');
        if (selectedModel) {
            document.getElementById('summary-modelo').textContent = selectedModel.querySelector('h4').textContent;
        }
        
        const selectedWood = document.querySelector('#step-madeira .option-card.selected');
        if (selectedWood) {
            document.getElementById('summary-madeira').textContent = selectedWood.querySelector('h4').textContent;
        }
        
        const selectedAccessories = [];
        document.querySelectorAll('.accessories-list input[type="checkbox"]:checked').forEach(checkbox => {
            const accessoryName = checkbox.nextElementSibling.textContent.replace(/\(\+ R\$\ \d+\)/, '').trim();
            selectedAccessories.push(accessoryName);
        });
        
        document.getElementById('summary-acessorios').textContent = 
            selectedAccessories.length > 0 ? selectedAccessories.join(', ') : 'Nenhum selecionado';
        
        document.getElementById('summary-total').textContent = document.getElementById('preview-price').textContent;
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula o envio do formulário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula a inscrição
            alert('Obrigado por se inscrever em nossa newsletter!');
            this.reset();
        });
    }
});