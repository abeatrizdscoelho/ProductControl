export const validarCamposNumericos = ({ price, stock, setErrorPrice, setErrorStock }) => {
    let isValid = true;

    //Validação do Preço.
    if (isNaN(price) || price.trim() === "") { //Verifica se não é um nº e se o campo está vazio. 
        setErrorPrice(true);
        isValid = false;
    }

    //Validação da Quantidade.
    if (isNaN(stock) || stock.trim() === "") {
        setErrorStock(true);
        isValid = false;
    }

    return isValid;
};