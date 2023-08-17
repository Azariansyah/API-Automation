const supertest = require('supertest');
const expect = require('chai').expect;

const api = supertest('https://kasir-api.belajarqa.com');

describe('Delete User API Test', () => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjZTZmMTVkLTY0YjEtNDQxYy05NWJhLWM3ZTliYmU0MmVkOSIsImNvbXBhbnlJZCI6ImRhOTNmMDA4LTU3YjYtNDliOC04YWNkLWExNjEwM2I3NmExZCIsImlhdCI6MTY5MjIzMDQ3Mn0.Ov1125QjpP9ZOSS2BTs0uNk4T3B9qn_zvLzeYFZWobs';
    it('should delete user successfully', async () => {
        const userId = '57826bb0-ec34-4065-a2ef-9ebf9a1ff43c';
        const response = await api
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json');

        // Tampilkan status response
        console.log('Response Status:', response.status);

        // Tampilkan body response
        console.log('Response Body:', response.body);

        // Assertion menggunakan Chai
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'User berhasil dihapus');
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