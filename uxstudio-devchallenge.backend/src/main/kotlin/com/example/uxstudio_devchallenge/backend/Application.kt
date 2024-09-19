package com.example.uxstudio_devchallenge.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus
import java.util.*

@SpringBootApplication
class Application

fun main(args: Array<String>) {
	runApplication<Application>(*args)
}

@RestController
class ContactController(val service: ContactService) {
	@GetMapping("/contacts")
	fun readAll(): List<Contact> {
		return service.findContacts()
	}

	@GetMapping("/contacts/{id}")
	fun read(@PathVariable id: Int): Contact {
		return service.findContactById(id).orElseThrow {
			ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"Contact not found"
			)
		}
	}

	@PostMapping("/contacts")
	fun create(@RequestBody contact: Contact) {
		contact.contactId = null
		service.saveContact(contact)
	}

	@PutMapping("/contacts")
	fun update(@RequestBody contact: Contact) {
		service.saveContact(contact)
	}

	@DeleteMapping("/contacts/{id}")
	fun delete(@PathVariable id: Int) {
		service.deleteContact(id)
	}
}

interface ContactRepository : CrudRepository<Contact, Int>

@Table("CONTACTS")
data class Contact(@Id var contactId: Int?, var fullName: String, var phoneNumber: String, var emailAddress: String, var profilePicBase64: String)

@Service
class ContactService(val db: ContactRepository) {
	fun findContacts(): List<Contact> {
		return db.findAll().toList()
	}

	fun findContactById(id: Int): Optional<Contact> {
		return db.findById(id)
	}

	fun saveContact(contact: Contact) {
		db.save(contact)
	}

	fun deleteContact(id: Int) {
		db.deleteById(id)
	}
}
