const fs = require('fs').promises;
const path = require('path');

const readCards = async () => {
  const data = await fs.readFile(path.resolve(__dirname, '../cards.json'));
  const jsonData = JSON.parse(data);
  return jsonData;
};

const setNewCards = async (newCard) => {
  const getOldCards = await readCards();
  const newGroupCards = [...getOldCards, newCard];
  const jsonGroupCard = JSON.stringify(newGroupCards);
  try {
    await fs.writeFile(path.resolve(__dirname, '../cards.json'), jsonGroupCard);
    return newGroupCards;
  } catch (error) {
    console.error(`Não foi possível executar a atulização ${ error }`);
  }
};

const updateCard = async (id, newCards) => {
  const getOldCards = await readCards();
  const updateCards = { id, ...newCards };
  const updateGroupCard = getOldCards.reduce((acomCard, actualCard) => {
    if (actualCard.id === updateCards.id) {
      return [...acomCard, updateCards];
    }
    return [...acomCard, actualCard];
  }, []);

  const arrayCards = JSON.stringify(updateGroupCard);
  try {
    await fs.writeFile(path.resolve(__dirname, '../cards.json'), arrayCards);
    console.log(`o card com id: ${ id } foi atualizado!`);
    return updateCards;
  } catch (error) {
    console.error(`não foi possível atualizar! ${ error }`);
  }
};

const deleteCard = async (id) => {
  const getCards = await readCards();
  const newCards = getCards.filter((card) => card.id !== id);
  const newCard = newCards;
  const jsonCard = JSON.stringify(newCard);
  try {
    await fs.writeFile(path.resolve(__dirname, '../cards.json'), jsonCard);
  } catch (error) {
    console.error('Não foi possível deletar esse card!');
  }
};

module.exports = {
  setNewCards,
  updateCard,
  deleteCard,
};