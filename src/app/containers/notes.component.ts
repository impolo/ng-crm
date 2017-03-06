import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {CrmService} from "../services/crm.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Note} from "../models/note";
import {Location} from '@angular/common';

@Component({
  selector: 'aio-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {

  loading: boolean
  notes: Note[] = []

  leadId: number

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private cs: CrmService, private router: Router, private aroute: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {

    this.loading = true

    this.aroute.params
      .flatMap(params => {
        {
          this.leadId = params['leadId']
        }
        return this.cs.getNotes(this.leadId)
      })
      .subscribe(data => {
          if (data['rows'])
            data['rows'].map((note: Note) => {
              //note.SLSCRMNoteDateTime = note.SLSCRMNoteDateTime.r
              this.notes.push(note)})
        },
        error => {
          console.log(error)
          this.loading = false
          // this.cs.showCrmError(error)
        })

  }

  back() {
    this.location.back()

  }

  getNoteClass(note: Note) {
    if (note.SLSCRMNotePriority) {
      return "is-error"
    } else {
      return "is-info"
    }
  }

  newNote() {
    this.router.navigate([this.router.url + "/new"])
  }

}
