// Configuração do jsPDF
const { jsPDF } = window.jspdf;

// Formulário de orçamento
const orcamentoForm = document.getElementById('orcamento-form');
if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const observacoes = document.getElementById('observacoes').value;
        
        // Coleta as seleções do instrumento
        const modelo = document.getElementById('summary-modelo').textContent;
        const madeira = document.getElementById('summary-madeira').textContent;
        const acessorios = document.getElementById('summary-acessorios').textContent;
        const total = document.getElementById('summary-total').textContent;
        
        // Cria o PDF
        generatePDF(nome, email, telefone, modelo, madeira, acessorios, total, observacoes);
    });
}

function generatePDF(nome, email, telefone, modelo, madeira, acessorios, total, observacoes) {
    // Cria uma nova instância do jsPDF
    const doc = new jsPDF();
    
    // Adiciona o logo (simulado)
    doc.setFontSize(22);
    doc.setTextColor(139, 90, 43);
    doc.text('Luthieria Eliel Marcos', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Instrumentos de corda artesanais desde 2005', 105, 26, { align: 'center' });
    
    // Linha divisória
    doc.setDrawColor(139, 90, 43);
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
    
    // Título do documento
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('ORÇAMENTO PERSONALIZADO', 105, 40, { align: 'center' });
    
    // Data
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    doc.setFontSize(10);
    doc.text(`Data: ${dataFormatada}`, 20, 50);
    
    // Informações do cliente
    doc.setFontSize(14);
    doc.text('Dados do Cliente:', 20, 60);
    doc.setFontSize(12);
    doc.text(`Nome: ${nome}`, 20, 70);
    doc.text(`E-mail: ${email}`, 20, 78);
    doc.text(`Telefone: ${telefone || 'Não informado'}`, 20, 86);
    
    // Detalhes do instrumento
    doc.setFontSize(14);
    doc.text('Detalhes do Instrumento:', 20, 100);
    
    // Tabela de itens
    doc.autoTable({
        startY: 105,
        head: [['Item', 'Descrição']],
        body: [
            ['Modelo', modelo],
            ['Madeira', madeira],
            ['Acessórios', acessorios],
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [139, 90, 43],
            textColor: [255, 255, 255]
        },
        styles: {
            cellPadding: 5,
            fontSize: 10
        }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text(`Total: ${total}`, 20, finalY);
    
    // Observações
    if (observacoes) {
        doc.setFontSize(12);
        doc.text('Observações:', 20, finalY + 10);
        doc.text(observacoes, 20, finalY + 18, { maxWidth: 170 });
    }
    
    // Rodapé
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Este orçamento tem validade de 30 dias a partir da data de emissão.', 105, 280, { align: 'center' });
    doc.text('Luthieria Eliel Marcos - Rua das Cordas, 123 - Centro, São Paulo/SP - contato@luthieriaelielmarcos.com.br', 105, 285, { align: 'center' });
    
    // Salva o PDF
    doc.save(`Orcamento_${nome.replace(/\s/g, '_')}_${dataFormatada.replace(/\//g, '-')}.pdf`);
    
    // Feedback para o usuário
    alert('Orçamento gerado com sucesso! O download do PDF começará automaticamente.');
}