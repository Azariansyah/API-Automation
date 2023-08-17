const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://kasir-api.belajarqa.com');

describe('Get Unit API Test', () => {
    it('should get units successfully', async () => {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjZTZmMTVkLTY0YjEtNDQxYy05NWJhLWM3ZTliYmU0MmVkOSIsImNvbXBhbnlJZCI6ImRhOTNmMDA4LTU3YjYtNDliOC04YWNkLWExNjEwM2I3NmExZCIsImlhdCI6MTY5MjIzMDQ3Mn0.Ov1125QjpP9ZOSS2BTs0uNk4T3B9qn_zvLzeYFZWobs';
        const response = await api.get('/units?q=gram&page=1')
            .set('Authorization', `Bearer ${accessToken}`);

        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Tampilkan body respon
        console.log('Response Body:', response.body);

        // Assertion menggunakan Chai
        expect(response.status).to.equal(200);
    });
    it('should fail with wrong token', async () => {
        const wrongAccessToken = 'this_is_a_wrong_token';

        const response = await api.get('/users?q=kasir&p=1')
            .set('Authorization', `Bearer ${wrongAccessToken}`);

        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Assertion menggunakan Chai untuk respons yang diharapkan saat token salah
        expect(response.status).to.equal(401);
    });
});