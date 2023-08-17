const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://kasir-api.belajarqa.com');

describe('Login API Test', () => {
    before(function () {
        this.timeout(10000); // Set timeout to 10 seconds
    });
    it('should login successfully', async () => {
        const response = await api.post('/authentications')
            .send({
                email: 'azhari.iriansyah@gmail.com',
                password: 'bismillah'
            });

        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Tampilkan body respon
        console.log('Response Body:', response.body);

        // Assertion menggunakan Chai
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('data');
        expect(response.body.data.user.name).to.equal("Toko Azhari");
    });
    it('should fail to login with incorrect credentials', async () => {
        before(function () {
            this.timeout(10000); // Set timeout to 10 seconds
        }); const response = await api.post('/authentications')
            .send({
                email: 'invalid.email@example.com',
                password: 'wrong_password'
            });
        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Tampilkan body respon
        console.log('Response Body:', response.body);
        // Assertion menggunakan Chai untuk respons yang diharapkan saat gagal login
        expect(response.status).to.equal(401);
    });
});