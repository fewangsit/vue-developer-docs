# WebDriver IO Selector Guide

Halaman ini mendokumentasikan pola-pola ter-standard untuk mencari selector automation di WebDriverIO untuk project WangsVue.



### Mencari Button dengan textnya

```typescript
const button = $("aria/Save Changes")
```

### Mencari Link dengan Anchornya

```typescript
const resetLink = $("aria/Reset here")
```

### Cari Checkbox dari Label

```typescript
const stayCheckbox = $("aria/Stay on this form after submitting")
```

### Mencari Input, Typing, dan Cek Error Message

Cari input berdasarkan Label:

Berlaku untuk input:

1. Text
2. Number
3. Textarea
4. Currency
5. Input file
6. OTP (Tanpa label, default aria labelnya "OTP Digit 1", "OTP Digit 2", dst)

Semua input di atas bisa langsung aksi `.setValue()`

Untuk OTP cukup set value ke first digit input.

<pre class="language-typescript"><code class="lang-typescript"><strong>class ExamplePageObjectModel {
</strong>    // Cari input dari Label
    get emailInput() { return $('aria/Email'); }
    get passwordInput() { return $('aria/Password'); }
    get loginButton() { return $('aria/Login'); }
    get inputFile() { return $('aria/Upload File'); } 
    get assetValueInput() { return $('aria/Asset Value'); }
    get inputOtp() { return $('aria/OTP Digit 1); }

    /**
     * AMBIL ERROR MESSAGE PAKE ID DARI aria-describedby
     * @param {WebdriverIO.Element} inputElement 
     */
    async getErrorMessageFor(inputElement) {
        // Ambil value ID yang ada di dalam atribut aria-describedby
        const errorId = await inputElement.getAttribute('aria-describedby');
        
        // Kembalikan element-nya menggunakan ID selector (#)
        return $(`#${errorId}`);
    }
    
    async setOtp(otp) {
        await this.inputOtp.setValue(otp) // Cukup set value ke first input
    }
}

export default new LoginPage();
</code></pre>

### Scoping Aksi di Dialog

Gunakan dialog title sebagai Accessibility ID. Berlaku di semua dialog, termasuk Dialog Confirmation.

```typescript
class EditProfileDialog {
    // Getter untuk container utama dialognya
    get container() { return $('aria/Edit Profile'); }

    // Selector input di DALAM container
    get usernameInput() { 
        return this.container.$('aria/Username'); 
    }

    // Selector footer di DALAM container
    get footer() { 
        return this.container.$('footer'); 
    }

    // Selector button di DALAM footer
    get saveBtn() { 
        return this.footer.$('aria/Save Profile Changes'); 
    }

    // Action untuk mempermudah flow
    async updateUsername(newName) {
        await this.usernameInput.setValue(newName);
        await this.saveBtn.click();
    }
}

export default new EditProfileDialog();
```



