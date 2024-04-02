import Exception from './exception.json';
import UserMessages from './users-messages.json';
import ProjectsMessages from './projects-messages.json';
import ProfileMessages from './profile-messages.json';
import CommentMessages from './comments-messages.json';
import QuestionsMessages from './question-messages.json';
import GoalsMessages from './goals-messages.json';
import TeamMessages from './team-messages.json';
import ProjectIdea from './project-idea-messages.json';
import Updates from './updates-messages.json';
import Decisions from './decisions-messages.json';
import FollowProject from './follow-project-messages.json';
import TaskList from './tasklist-messages.json';

export default {
  ...Exception,
  ...UserMessages,
  ...ProjectsMessages,
  ...ProfileMessages,
  ...QuestionsMessages,
  ...CommentMessages,
  ...GoalsMessages,
  ...TeamMessages,
  ...ProjectIdea,
  ...Updates,
  ...Decisions,
  ...FollowProject,
  ...TaskList,
};
