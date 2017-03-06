import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {CrmService} from "../services/crm.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Note} from "../models/note";

@Component({
  selector: 'aio-new-note',
  templateUrl: './new-note.component.html'
})
export class NewNoteComponent implements OnInit {

  newNoteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private cs: CrmService, private router: Router, private aroute: ActivatedRoute, private location: Location) {

    this.newNoteForm = formBuilder.group({
      'comments': [''],
      'priority': ['']
    });

  }

  ngOnInit() {
  }

  saveNote() {

    let note: Note = new Note()
    note.SLSCRMNoteComments = this.newNoteForm.controls['comments'].value
    note.SLSCRMNotePriority = this.newNoteForm.controls['priority'].value
    note.SLSCRMNoteType = "G"

    this.cs.addNote(note)
      .subscribe(data => {
          console.log(data)
          this.location.back()
        },
        error => console.log(error))

    return
  }

  back() {
    this.location.back()
  }

}
