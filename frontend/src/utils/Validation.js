export const validarCamposNumericos = ({ price, stock, setErrorPrice, setErrorStock, showToast }) => {
    let isValid = true;

    //Validação do Preço.
    if (isNaN(price) || price.trim() === "") { //Verifica se não é um nº e se o campo está vazio. 
        setErrorPrice(true);
        showToast('Insira um valor numérico válido para o preço.', 'error');
        isValid = false;
    }

    //Validação da Quantidade.
    if (isNaN(stock) || stock.trim() === "") {
        setErrorStock(true);
        showToast('Insira um número válido para a quantidade.', 'error');
        isValid = false;
    }

    return isValid;
};