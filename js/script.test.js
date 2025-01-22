describe('Username Regex Validation', function () {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    it('should validate a username with at least 1 capital letter, 1 special character, 1 number, and 8 characters', function () {
        const validUsernames = [
            'Password1!',
            'User@1234',
            'Test#5678',
            'Valid$User9'
        ];

        validUsernames.forEach(username => {
            expect(regex.test(username)).toBe(true);
        });
    });

    it('should invalidate a username without a capital letter', function () {
        const invalidUsernames = [
            'password1!',
            'user@1234',
            'test#5678',
            'valid$user9'
        ];

        invalidUsernames.forEach(username => {
            expect(regex.test(username)).toBe(false);
        });
    });

    it('should invalidate a username without a special character', function () {
        const invalidUsernames = [
            'Password1',
            'User1234',
            'Test5678',
            'ValidUser9'
        ];

        invalidUsernames.forEach(username => {
            expect(regex.test(username)).toBe(false);
        });
    });

    it('should invalidate a username without a number', function () {
        const invalidUsernames = [
            'Password!',
            'User@abcd',
            'Test#efgh',
            'Valid$User'
        ];

        invalidUsernames.forEach(username => {
            expect(regex.test(username)).toBe(false);
        });
    });

    it('should invalidate a username with less than 8 characters', function () {
        const invalidUsernames = [
            'Pass1!',
            'Us@12',
            'Te#56',
            'Va$U9'
        ];

        invalidUsernames.forEach(username => {
            expect(regex.test(username)).toBe(false);
        });
    });
});