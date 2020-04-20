import siteSM from './siteSM';
import voteM from './voteM';
import prjM from './prjM';
import measure from './measure';
import user from './user';

export default {
    ...user,
    ...siteSM,
    ...prjM,
    ...measure,
    ...voteM
};
