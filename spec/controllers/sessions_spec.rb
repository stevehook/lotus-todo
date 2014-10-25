require 'spec_helper'
require 'app/controllers/sessions'
require 'app/entities/user'
require 'app/repositories/user_repository'

describe Todo::Controllers::Sessions do
  let(:user) { User.new(id: 123, name: 'Bob Roberts', email: 'bob@example.com') }

  before do
    allow(UserRepository).to receive(:find_by_email) { nil }
    allow(UserRepository).to receive(:find_by_email).with('bob@example.com') { user }
  end

  describe Todo::Controllers::Sessions::Create do
    let(:action) { described_class.new }
    context 'given a valid user' do
      it 'creates a new session' do
        action.call({ email: 'bob@example.com' })
        expect(action.send(:session)[:user_id]).to eql(user.id)
      end
    end

    context 'given an invalid user' do
      it 'returns an error' do
        code, _, _ = action.call({ email: 'jim@example.com' })
        expect(code).to eql(401)
        expect(action.send(:session)[:user_id]).to be_nil
      end
    end
  end

  describe Todo::Controllers::Sessions::Delete do
    let(:action) { described_class.new }

    it 'destroys the session' do
      action.call({'rack.session' => session = { user_id: '123' }})
      expect(action.send(:session)[:user_id]).to be_nil
    end
  end
end
