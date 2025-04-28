import sys
import json

def dummy_rag_response(query, user_id, conversation_id):
    return {
        "answer": f"Hello {user_id}, you asked: '{query}' — here is your answer!",
        "citations": ["https://example.com/fake-source"]
    }

if __name__ == "__main__":
    request = json.loads(sys.argv[1])
    query = request["query"]
    user_id = request["user_id"]
    conversation_id = request["conversation_id"]

    response = dummy_rag_response(query, user_id, conversation_id)
    print(json.dumps(response))
