---
icon: screwdriver-wrench
---

# WebDriver IO Selector Guide

Halaman ini mendokumentasikan pola-pola ter-standard untuk mencari selector automation di WebDriverIO untuk project WangsVue.



### Mencari Button dengan text

```typescript
const button = $("aria/Save Changes")
```

### Mencari Link dengan Anchor

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

export default new ExamplePageObjectModel();
</code></pre>

### Memilih Opsi di Dropdown dan Multi Select

Sebelum milih opsi, harus tau dulu opsi apa yang mau di select, dari Label nya.\
\
Contoh misal mau pilih position "QA Engineer" di Dropdown:

<pre class="language-javascript"><code class="lang-javascript">class CreateUserForm {
    get container() { return $('aria/Create User'); }

    // Helper generic untuk ambil field berdasarkan label (biar gak buat getter satu-sama)
    field(label) { return this.container.$(`aria/${label}`); }

    // Panel dropdown (portal)
    dropdownPanel(label) { return $(`aria/${label} Panel`); }

    get saveBtn() { return this.container.$('aria/Submit'); }

    /**
     * Helper untuk pilih option di dropdown
     * Bisa dipakai buat single select dropdown maupun multi select
     */
    async selectOption(label, optionName) {
        await this.field(label).click();
        const panel = await this.dropdownPanel(label);
        await panel.waitForDisplayed();
        
        // bakal cari option element dengan aria-label=QA Engineer
        // Gunakan backtick `` untuk template literal, bukan single quote ''
<strong>        await panel.$(`aria/${optionName}`).click(); 
</strong>
        await this.field(label).click(); // Tutup panel
    }

    async fillForm(data) {
        // Pilih Position
        await this.selectOption('Position', data.position);

        // Pilih Hobi (Jika data.hobies itu Array, kita loop)
        for (const hobi of data.hobies) {
            await this.selectOption('Hobies', hobi);
        }

        await this.saveBtn.click();
    }
}

export default new CreateUserForm();
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



### Scoping Aksi di Filter Panel / Filter Container

<pre class="language-typescript"><code class="lang-typescript">class PageObject {
    get buttonFilter() {
<strong>        return $('aria/Toggle Filter Panel');
</strong>    }

    get container() {
<strong>       return $('aria/Filter Panel');
</strong>    }
    
    get applyButton() {
       return this.container.$('aria/Apply')
    } 
    
    get clearButton() {
       return this.container.$('aria/Clear Field')
    }     
}
</code></pre>

