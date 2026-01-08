/// <reference types="cypress" />

describe('Teste funcional', () => {
    beforeEach(() => {
        //cy.login('onoffjunior@gmail.com', '#@Barriga')        
    })


    it('Criar conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: 'onoffjunior@gmail.com',
                redirecionar: false,
                senha: '#@Barriga'
            }
        }).its('body.token').should('not.be.empty')
    })

    it('Alterar conta', () => {
        
    })

    it('criar conta com o mesmo nome', () => {
       
    })

    it('Salvando Movimentos', () => {
        
    })

    it('Consultar saldo', () => {
        
    })

    it('Remover movimento', () => {
     
    })

    it('Excluir conta', () => {
       
    })
})


