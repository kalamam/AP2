package com.example.manishma.chat;

import android.view.View;

import com.example.manishma.entities.Contact;

public interface ContactClickListener {
    void onContactClick(View v, Contact contact);
}
