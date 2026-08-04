<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnalyzeUrlRequest extends FormRequest
{
    /**
     * Apakah user boleh melakukan request ini?
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [
            'url' => [
                'required',
                'string',
                'url',
                'max:2048',
            ],
        ];
    }

    /**
     * Custom error message.
     */
    public function messages(): array
    {
        return [
            'url.required' => 'URL wajib diisi.',
            'url.url' => 'Format URL tidak valid.',
            'url.max' => 'URL terlalu panjang.',
        ];
    }

    /**
     * Setelah lolos validasi.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('url')) {
            $this->merge([
                'url' => trim($this->url),
            ]);
        }
    }
}