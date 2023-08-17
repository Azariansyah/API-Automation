const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://kasir-api.belajarqa.com');

describe('Get User API Test', () => {
    it('should get user successfully', async () => {
        // Simpan token dari respons login sebelumnya
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjZTZmMTVkLTY0YjEtNDQxYy05NWJhLWM3ZTliYmU0MmVkOSIsImNvbXBhbnlJZCI6ImRhOTNmMDA4LTU3YjYtNDliOC04YWNkLWExNjEwM2I3NmExZCIsImlhdCI6MTY5MjIyNjE1NH0.B3uve-7KK2yE8dl1szQ7iOQoP7YDKzLs86LyKUjiI8M';

        const response = await api.get('/users?q=kasir&p=1')
            .set('Authorization', `Bearer ${accessToken}`);

        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Tampilkan data user
        console.log('User Data:');
        response.body.data.users.forEach(user => {
            console.log(`User ID: ${user.id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log('---');
        });

        // Tampilkan informasi meta
        console.log('Meta Information:');
        console.log(`Total Pages: ${response.body.data.meta.totalPages}`);
        console.log(`Total Users: ${response.body.data.meta.total}`);
        console.log(`Current Page: ${response.body.data.meta.page}`);

        // Assertion menggunakan Chai
        expect(response.status).to.equal(200);
        // Lakukan asserstion lain sesuai dengan struktur respons
    });
    it('should fail with wrong token', async () => {
        // Gunakan token yang salah atau tidak valid
        const wrongAccessToken = 'this_is_a_wrong_token';

        const response = await api.get('/users?q=kasir&p=1')
            .set('Authorization', `Bearer ${wrongAccessToken}`);

        // Tampilkan status respon
        console.log('Response Status:', response.status);

        // Assertion menggunakan Chai untuk respons yang diharapkan saat token salah
        expect(response.status).to.equal(401);
    });
});
