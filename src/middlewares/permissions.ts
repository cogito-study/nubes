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
        teachers: Array<SuggestionPermissionType>;
        students: Array<SuggestionPermissionType>;
      };
    };
  };
  posts: {
    permissions: {
      teachers: Array<PostPermissionType>;
      students: Array<PostPermissionType>;
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
    teachers: [
      'READ_SUBJECT',
      'UPDATE_SUBJECT',
      'DELETE_SUBJECT',
      'CREATE_NOTE',
      'CREATE_SUBJECT_INFORMATION',
    ],
    students: ['READ_SUBJECT'],
  },
  notes: {
    permissions: {
      teachers: ['READ_NOTE', 'UPDATE_NOTE', 'DELETE_NOTE', 'CREATE_SUGGESTION'],
      students: ['READ_NOTE', 'CREATE_SUGGESTION'],
    },
    suggestions: {
      permissions: {
        teachers: ['APPROVE_SUGGESTION', 'REJECT_SUGGESTION'],
        students: ['READ_SUGGESTION'],
      },
    },
  },
  posts: {
    permissions: {
      teachers: ['UPDATE_POST', 'DELETE_POST', 'READ_POST'],
      students: ['READ_POST'],
    },
  },
  subjectInformations: {
    permissions: {
      teachers: [
        'READ_SUBJECT_INFORMATION',
        'UPDATE_SUBJECT_INFORMATION',
        'DELETE_SUBJECT_INFORMATION',
      ],
      students: ['READ_SUBJECT_INFORMATION'],
    },
  },
};
