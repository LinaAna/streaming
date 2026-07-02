import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,  } from '@angular/forms';
import { Streaming } from '../../../core/services/artigo-service';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {

  private artigoService = inject(Streaming)
  selectedFile: File | null = null
  
  artigoForm = new FormGroup({
    titulo: new FormControl(),
    genero: new FormControl(),
    ano_lancamento: new FormControl(),
    nota: new FormControl(),
  })


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.artigoForm.value;

    Object.entries(values).forEach(([Key, value]) => {
      formData.append(Key, String(value))
    })

    if(this.selectedFile){
      formData.append("imagem", this.selectedFile)
    }

    this.artigoService.create(formData).subscribe({
      next: () => {
        alert("Criado com sucesso!")
      },
      error: () => {
        alert("Foi não")
      }
    })
  }
}
