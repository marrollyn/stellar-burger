const url = 'https://norma.nomoreparties.space/api';
const testUrl = 'http://localhost:4000';

describe('тестирование работы страницы конструктора', () => {
  beforeEach(() => {
    //настроен перехват запроса на эндпоинт 'api/ingredients’
    cy.intercept('GET', `${url}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    //задаем access токен
    cy.setCookie('accessToken', 'fakeAccessToken');
    localStorage.setItem('refreshToken', 'fakeRefreshToken');

    //настроен перехват запроса на эндпоинт 'api/auth/user’
    cy.intercept('GET', `${url}/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');
    //сервис должен быть доступен по адресу localhost:4000 и задан refreshtoken
    cy.visit(testUrl);

    //задаем алиасы
    cy.get('div').contains('Выберите булки').as('chooseBuns');
    cy.get('div').contains('Выберите начинку').as('chooseFilling');
  });

  afterEach(() => {
    //очищаем токены
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('добавление ингредиента из списка в конструктор', () => {
    it('булка добавляется в конструктор', () => {
      //находим булку
      const bun = cy.get('h3').contains('Булки').next();
      //находим кнопку у булки
      const bunButton = bun.contains('Добавить');
      //находим состояние конструктора до добавления булки

      cy.get('@chooseBuns').should('exist');
      //добавляем булку в конструктор
      bunButton.click();
      //проверяем состояние конструктора после добавления булки
      cy.get('@chooseBuns').should('not.exist');
    });

    it('начинка добавляется в конструктор', () => {
      //находим начинку
      const main = cy.get('h3').contains('Начинки').next();
      //находим кнопку у начинки
      const mainButton = main.contains('Добавить');
      //находим состояние конструктора до добавления начинки
      cy.get('@chooseFilling').should('exist');
      //добавляем булку в конструктор
      mainButton.click();
      //проверяем состояние конструктора после добавления начинки
      cy.get('@chooseFilling').should('not.exist');
    });
  });

  describe('работа модальных окон', () => {
    beforeEach(() => {
      //проверяем, что окно не открыто
      cy.get('div').contains('Детали ингредиента').should('not.exist');
      //находим ингредиент на примере булки
      const ingredient = cy.get('h3').contains('Булки').next();
      //кликаем по ингредиенту
      ingredient.contains('Краторная булка').click();
      //задаем алиас
      cy.get('div').contains('Детали ингредиента').as('modal');
    });

    it('открытие модального окна ингредиента', () => {
      //проверяем, что окно открыто

      cy.get('@modal').should('exist');
      //проверяем, что открыто нужное окно
      cy.get('h3').contains('Краторная булка').should('exist');
    });

    it('закрытие по клику на крестик', () => {
      //находим кнопку закрытия окна и кликаем по ней
      cy.get('[data-cy="close"]').click();
      //проверяем, что окно закрыто
      cy.get('@modal').should('not.exist');
    });
  });

  describe('создание заказа', () => {
    beforeEach(() => { });

    it('проверка пользователя', () => {
      cy.get('[data-cy="user"]').contains('Joe Doe').should('exist');
      // cy.contains('Joe Doe').should('exist');
    });

    it('проверка создания заказа', () => {
      //перехватываем данные заказа
      cy.intercept('POST', `${url}/orders`, {
        fixture: 'order.json'
      }).as('orderRequest');
      //оформляем заказ

      //находим булку
      const bun = cy.get('h3').contains('Булки').next();
      //находим кнопку у булки
      const bunButton = bun.contains('Добавить');
      //находим состояние конструктора до добавления булки
      cy.get('@chooseBuns').should('exist');
      //добавляем булку в конструктор
      bunButton.click();

      //находим начинку
      const main = cy.get('h3').contains('Начинки').next();
      //находим кнопку у начинки
      const mainButton = main.contains('Добавить');
      //находим состояние конструктора до добавления начинки
      cy.get('@chooseFilling').should('exist');
      //добавляем булку в конструктор
      mainButton.click();

      const orderButton = cy.contains('Оформить заказ');
      orderButton.should('be.visible').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="orderNumb"]').contains('51530').should('exist');
      cy.get('[data-cy="close"]').click();
      //проверяем, что окно закрыто
      cy.get('[data-cy="modal"]').should('not.exist');
      //проверяем, что конструктор пуст
      cy.get('@chooseBuns').should('exist');
      cy.get('@chooseFilling').should('exist');
    });
  });
});
