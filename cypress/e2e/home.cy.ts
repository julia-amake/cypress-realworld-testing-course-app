import {beforeEach} from "mocha";

describe('home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    context('Hero section', () => {
        it('passes', () => {
            cy.getByData('hero-heading').contains('Testing Next.js Applications with Cypress');
        });

        it("the features on the homepage are correct", () => {
            cy.get("dt").eq(0).contains('4 Courses');
            cy.get("dt").eq(1).contains('25+ Lessons');
            cy.get("dt").eq(2).contains('Free and Open Source');
        });
    });

    context.only('Courses section', () => {
        const courses = [
            {
                title: 'Testing Your First Next.js Application',
                pathname: '/testing-your-first-application'
            },
            {
                title: 'Testing Foundations',
                pathname: '/testing-foundations'
            },
            {
                title: 'Cypress Fundamentals',
                pathname: '/cypress-fundamentals'
            },
        ];

        courses.forEach(({title, pathname}, idx) => {
            it(`Course: ${title}`, () => {
                cy.getByData(`course-${idx}`).find('a').contains('Get started').click();
                cy.location('pathname').should('equal', pathname);
            });
        });
    });
});
