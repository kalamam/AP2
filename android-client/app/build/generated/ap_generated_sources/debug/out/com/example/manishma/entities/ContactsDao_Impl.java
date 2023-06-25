package com.example.manishma.entities;

import android.database.Cursor;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.SharedSQLiteStatement;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.annotation.processing.Generated;

@Generated("androidx.room.RoomProcessor")
@SuppressWarnings({"unchecked", "deprecation"})
public final class ContactsDao_Impl implements ContactsDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<Contact> __insertionAdapterOfContact;

  private final EntityInsertionAdapter<Message> __insertionAdapterOfMessage;

  private final SharedSQLiteStatement __preparedStmtOfDeleteContacts;

  private final SharedSQLiteStatement __preparedStmtOfDeleteMessages;

  public ContactsDao_Impl(RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfContact = new EntityInsertionAdapter<Contact>(__db) {
      @Override
      public String createQuery() {
        return "INSERT OR ABORT INTO `Contact` (`id`,`name`,`server`,`last`,`lastDate`,`profilePicture`) VALUES (?,?,?,?,?,?)";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Contact value) {
        if (value.getId() == null) {
          stmt.bindNull(1);
        } else {
          stmt.bindString(1, value.getId());
        }
        if (value.getName() == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.getName());
        }
        if (value.getServer() == null) {
          stmt.bindNull(3);
        } else {
          stmt.bindString(3, value.getServer());
        }
        if (value.getLast() == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindString(4, value.getLast());
        }
        if (value.getLastDate() == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.getLastDate());
        }
        stmt.bindLong(6, value.getProfilePicture());
      }
    };
    this.__insertionAdapterOfMessage = new EntityInsertionAdapter<Message>(__db) {
      @Override
      public String createQuery() {
        return "INSERT OR ABORT INTO `Message` (`id`,`content`,`created`,`sent`,`contactId`) VALUES (nullif(?, 0),?,?,?,?)";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Message value) {
        stmt.bindLong(1, value.getId());
        if (value.getContent() == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.getContent());
        }
        if (value.getCreated() == null) {
          stmt.bindNull(3);
        } else {
          stmt.bindString(3, value.getCreated());
        }
        final int _tmp = value.isSent() ? 1 : 0;
        stmt.bindLong(4, _tmp);
        if (value.contactId == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.contactId);
        }
      }
    };
    this.__preparedStmtOfDeleteContacts = new SharedSQLiteStatement(__db) {
      @Override
      public String createQuery() {
        final String _query = "DELETE FROM contact";
        return _query;
      }
    };
    this.__preparedStmtOfDeleteMessages = new SharedSQLiteStatement(__db) {
      @Override
      public String createQuery() {
        final String _query = "DELETE FROM message WHERE contactId = ?";
        return _query;
      }
    };
  }

  @Override
  public void insertContact(final Contact... contacts) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfContact.insert(contacts);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void insertMessage(final Message... messages) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfMessage.insert(messages);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void deleteContacts() {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDeleteContacts.acquire();
    __db.beginTransaction();
    try {
      _stmt.executeUpdateDelete();
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
      __preparedStmtOfDeleteContacts.release(_stmt);
    }
  }

  @Override
  public void deleteMessages(final String id) {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDeleteMessages.acquire();
    int _argIndex = 1;
    if (id == null) {
      _stmt.bindNull(_argIndex);
    } else {
      _stmt.bindString(_argIndex, id);
    }
    __db.beginTransaction();
    try {
      _stmt.executeUpdateDelete();
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
      __preparedStmtOfDeleteMessages.release(_stmt);
    }
  }

  @Override
  public List<Contact> index() {
    final String _sql = "SELECT * FROM contact";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfServer = CursorUtil.getColumnIndexOrThrow(_cursor, "server");
      final int _cursorIndexOfLast = CursorUtil.getColumnIndexOrThrow(_cursor, "last");
      final int _cursorIndexOfLastDate = CursorUtil.getColumnIndexOrThrow(_cursor, "lastDate");
      final int _cursorIndexOfProfilePicture = CursorUtil.getColumnIndexOrThrow(_cursor, "profilePicture");
      final List<Contact> _result = new ArrayList<Contact>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final Contact _item;
        final String _tmpId;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmpId = null;
        } else {
          _tmpId = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpName;
        if (_cursor.isNull(_cursorIndexOfName)) {
          _tmpName = null;
        } else {
          _tmpName = _cursor.getString(_cursorIndexOfName);
        }
        final String _tmpServer;
        if (_cursor.isNull(_cursorIndexOfServer)) {
          _tmpServer = null;
        } else {
          _tmpServer = _cursor.getString(_cursorIndexOfServer);
        }
        final String _tmpLast;
        if (_cursor.isNull(_cursorIndexOfLast)) {
          _tmpLast = null;
        } else {
          _tmpLast = _cursor.getString(_cursorIndexOfLast);
        }
        final String _tmpLastDate;
        if (_cursor.isNull(_cursorIndexOfLastDate)) {
          _tmpLastDate = null;
        } else {
          _tmpLastDate = _cursor.getString(_cursorIndexOfLastDate);
        }
        _item = new Contact(_tmpId,_tmpName,_tmpServer,_tmpLast,_tmpLastDate);
        final int _tmpProfilePicture;
        _tmpProfilePicture = _cursor.getInt(_cursorIndexOfProfilePicture);
        _item.setProfilePicture(_tmpProfilePicture);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public List<Message> getMessages() {
    final String _sql = "SELECT * FROM message";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfContent = CursorUtil.getColumnIndexOrThrow(_cursor, "content");
      final int _cursorIndexOfCreated = CursorUtil.getColumnIndexOrThrow(_cursor, "created");
      final int _cursorIndexOfSent = CursorUtil.getColumnIndexOrThrow(_cursor, "sent");
      final int _cursorIndexOfContactId = CursorUtil.getColumnIndexOrThrow(_cursor, "contactId");
      final List<Message> _result = new ArrayList<Message>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final Message _item;
        final String _tmpContent;
        if (_cursor.isNull(_cursorIndexOfContent)) {
          _tmpContent = null;
        } else {
          _tmpContent = _cursor.getString(_cursorIndexOfContent);
        }
        final String _tmpCreated;
        if (_cursor.isNull(_cursorIndexOfCreated)) {
          _tmpCreated = null;
        } else {
          _tmpCreated = _cursor.getString(_cursorIndexOfCreated);
        }
        final boolean _tmpSent;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfSent);
        _tmpSent = _tmp != 0;
        final String _tmpContactId;
        if (_cursor.isNull(_cursorIndexOfContactId)) {
          _tmpContactId = null;
        } else {
          _tmpContactId = _cursor.getString(_cursorIndexOfContactId);
        }
        _item = new Message(_tmpContent,_tmpCreated,_tmpSent,_tmpContactId);
        final int _tmpId;
        _tmpId = _cursor.getInt(_cursorIndexOfId);
        _item.setId(_tmpId);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public Contact getContact(final String id) {
    final String _sql = "SELECT * FROM contact WHERE id = ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (id == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, id);
    }
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfServer = CursorUtil.getColumnIndexOrThrow(_cursor, "server");
      final int _cursorIndexOfLast = CursorUtil.getColumnIndexOrThrow(_cursor, "last");
      final int _cursorIndexOfLastDate = CursorUtil.getColumnIndexOrThrow(_cursor, "lastDate");
      final int _cursorIndexOfProfilePicture = CursorUtil.getColumnIndexOrThrow(_cursor, "profilePicture");
      final Contact _result;
      if(_cursor.moveToFirst()) {
        final String _tmpId;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmpId = null;
        } else {
          _tmpId = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpName;
        if (_cursor.isNull(_cursorIndexOfName)) {
          _tmpName = null;
        } else {
          _tmpName = _cursor.getString(_cursorIndexOfName);
        }
        final String _tmpServer;
        if (_cursor.isNull(_cursorIndexOfServer)) {
          _tmpServer = null;
        } else {
          _tmpServer = _cursor.getString(_cursorIndexOfServer);
        }
        final String _tmpLast;
        if (_cursor.isNull(_cursorIndexOfLast)) {
          _tmpLast = null;
        } else {
          _tmpLast = _cursor.getString(_cursorIndexOfLast);
        }
        final String _tmpLastDate;
        if (_cursor.isNull(_cursorIndexOfLastDate)) {
          _tmpLastDate = null;
        } else {
          _tmpLastDate = _cursor.getString(_cursorIndexOfLastDate);
        }
        _result = new Contact(_tmpId,_tmpName,_tmpServer,_tmpLast,_tmpLastDate);
        final int _tmpProfilePicture;
        _tmpProfilePicture = _cursor.getInt(_cursorIndexOfProfilePicture);
        _result.setProfilePicture(_tmpProfilePicture);
      } else {
        _result = null;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public List<Message> getAllMessagesWithContact(final String id) {
    final String _sql = "SELECT * FROM message WHERE contactId = ? ORDER BY id";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (id == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, id);
    }
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfContent = CursorUtil.getColumnIndexOrThrow(_cursor, "content");
      final int _cursorIndexOfCreated = CursorUtil.getColumnIndexOrThrow(_cursor, "created");
      final int _cursorIndexOfSent = CursorUtil.getColumnIndexOrThrow(_cursor, "sent");
      final int _cursorIndexOfContactId = CursorUtil.getColumnIndexOrThrow(_cursor, "contactId");
      final List<Message> _result = new ArrayList<Message>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final Message _item;
        final String _tmpContent;
        if (_cursor.isNull(_cursorIndexOfContent)) {
          _tmpContent = null;
        } else {
          _tmpContent = _cursor.getString(_cursorIndexOfContent);
        }
        final String _tmpCreated;
        if (_cursor.isNull(_cursorIndexOfCreated)) {
          _tmpCreated = null;
        } else {
          _tmpCreated = _cursor.getString(_cursorIndexOfCreated);
        }
        final boolean _tmpSent;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfSent);
        _tmpSent = _tmp != 0;
        final String _tmpContactId;
        if (_cursor.isNull(_cursorIndexOfContactId)) {
          _tmpContactId = null;
        } else {
          _tmpContactId = _cursor.getString(_cursorIndexOfContactId);
        }
        _item = new Message(_tmpContent,_tmpCreated,_tmpSent,_tmpContactId);
        final int _tmpId;
        _tmpId = _cursor.getInt(_cursorIndexOfId);
        _item.setId(_tmpId);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
