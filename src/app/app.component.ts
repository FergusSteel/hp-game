import { Component } from '@angular/core';
import { book1 } from '../../assets/texts/1';
import { book2 } from '../../assets/texts/2';
import { book3 } from '../../assets/texts/3';
import { book4 } from '../../assets/texts/4';
import { book5 } from '../../assets/texts/5';
import { book6 } from '../../assets/texts/6';
import { book7 } from '../../assets/texts/7';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  currentPassage: string = '';
  currentBookNo: number = -1;
  currentScore:number = 0;
  fullTexts: any = new Array(7).fill('');
  highScore: number = 0;
  
  correctionMsg: string = '';
 
  buttons: Array<{ name: string, id: number }> = [
    { name: 'Philosopher\'s Stone', id: 1 },
    { name: 'Chamber of Secrets', id: 2 },
    { name: 'Prisoner of Azkaban', id: 3 },
    { name: 'Goblet of Fire', id: 4 },
    { name: 'Order of the Phoenix', id: 5 },
    { name: 'Half-Blood Prince', id: 6 },
    { name: 'Deathly Hallows', id: 7 },
  ];

  ngOnInit() {
    this.loadTextFiles();
    this.currentPassage = this.getRandomPassage();
  }

  loadTextFiles() {
    this.fullTexts = [
      book1,
      book2,
      book3,
      book4,
      book5,
      book6,
      book7
    ]
  }

  onClick(guess: number) {
    if (guess === this.currentBookNo) {
      this.currentScore += 1;
      if (this.currentScore > this.highScore) {
        this.highScore = this.currentScore
      }
    } else {
      this.currentScore = 0;
      this.correctionMsg = "Incorrect, that passage was from" + ": The " +(this.buttons.find(button => button.id === this.currentBookNo))!.name;
    }

    setTimeout(() => {
      this.correctionMsg = "";
    }, 3000)  

    

    this.currentPassage = this.getRandomPassage();
  }

  getRandomPassage() {
    const choice = Math.floor(Math.random() * 7) + 1;
    this.currentBookNo = choice;
    const lines = this.fullTexts[choice - 1].split('\n');
    const lineChoice = Math.floor(Math.random() * (lines.length - 3));
    return lines.slice(lineChoice, lineChoice + 3).join('\n');
  }
}