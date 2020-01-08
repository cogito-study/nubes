import {
  NotePermissionType,
  PostPermissionType,
  SubjectInformationPermissionType,
  SubjectPermissionType,
  SuggestionPermissionType,
} from '@prisma/photon';

export const subjectPermissions: {
  permissions: {
    teachers: Array<SubjectPermissionType>;
    students: Array<SubjectPermissionType>;
  };
  notes: {
    permissions: {
      teachers: Array<NotePermissionType>;
      students: Array<NotePermissionType>;
    };
    suggestions: {
      permissions: {
        teachers: {
          own: Array<SuggestionPermissionType>;
          others: Array<SuggestionPermissionType>;
        };
        students: {
          own: Array<SuggestionPermissionType>;
          others: Array<SuggestionPermissionType>;
        };
      };
    };
  };
  posts: {
    permissions: {
      teachers: {
        own: Array<PostPermissionType>;
        others: Array<PostPermissionType>;
      };
      students: {
        own: Array<PostPermissionType>;
        others: Array<PostPermissionType>;
      };
    };
  };
  subjectInformations: {
    permissions: {
      teachers: Array<SubjectInformationPermissionType>;
      students: Array<SubjectInformationPermissionType>;
    };
  };
} = {
  permissions: {
    teachers: ['READ_SUBJECT', 'CREATE_POST', 'CREATE_NOTE', 'CREATE_SUBJECT_INFORMATION'],
    students: ['READ_SUBJECT', 'CREATE_POST', 'CREATE_NOTE', 'CREATE_SUBJECT_INFORMATION'],
  },
  notes: {
    permissions: {
      teachers: ['READ_NOTE', 'UPDATE_NOTE', 'CREATE_SUGGESTION', 'DELETE_NOTE'],
      students: ['READ_NOTE', 'UPDATE_NOTE', 'CREATE_SUGGESTION'],
    },
    suggestions: {
      permissions: {
        teachers: {
          own: ['READ_SUGGESTION', 'APPROVE_SUGGESTION', 'REJECT_SUGGESTION'],
          others: ['READ_SUGGESTION', 'APPROVE_SUGGESTION', 'REJECT_SUGGESTION'],
        },
        students: {
          own: ['READ_SUGGESTION'],
          others: ['READ_SUGGESTION', 'APPROVE_SUGGESTION'],
        },
      },
    },
  },
  posts: {
    permissions: {
      teachers: {
        own: ['UPDATE_POST', 'DELETE_POST', 'READ_POST'],
        others: ['DELETE_POST', 'READ_POST'],
      },
      students: {
        own: ['UPDATE_POST', 'DELETE_POST', 'READ_POST'],
        others: ['READ_POST'],
      },
    },
  },
  subjectInformations: {
    permissions: {
      teachers: [
        'READ_SUBJECT_INFORMATION',
        'UPDATE_SUBJECT_INFORMATION',
        'DELETE_SUBJECT_INFORMATION',
      ],
      students: ['READ_SUBJECT_INFORMATION', 'UPDATE_SUBJECT_INFORMATION'],
    },
  },
};
